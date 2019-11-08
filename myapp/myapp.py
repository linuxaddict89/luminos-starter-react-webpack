import os
import sys
import signal
from PyQt5.QtCore import Qt, QTimer
from luminos.Application import Application

from .MyAppWindow import MyAppWindow
from .utils import getArgsParser

app = None


def sigint_handler(*args):
    global app
    """Handler for the SIGINT signal."""
    app.quit()


def main():
    signal.signal(signal.SIGINT, sigint_handler)

    """
    This attribute need to be set before QCoreApplication created,
    it will still show warning because QWebEngineView::initialize
    call this at the end.
    """
    MyApp.setAttribute(Qt.AA_ShareOpenGLContexts, True)
    app = MyApp(sys.argv[1:])

    # Python cannot handle signals while the Qt event loop is running.
    # so we need to use QTimer to let the interpreter run from time to time.
    # https://stackoverflow.com/questions/4938723/what-is-the-correct-way-to-make-my-pyqt-application-quit-when-killed-from-the-co
    timer = QTimer()
    timer.start(500)  # You may change this if you wish.
    timer.timeout.connect(lambda: None)  # Let the interpreter run each 500 ms.
    sys.exit(app.exec_())


class MyApp(Application):
    def __init__(self, argsv):
        plugin_dir = os.path.join(os.path.dirname(__file__), "plugins")
        self.registerUriScheme("runcy", os.path.dirname(__file__))
        self.registerUriScheme("plugins", plugin_dir)

        super().__init__(argsv, "runcy")
        self.registerPluginDir(plugin_dir)

        self.window = MyAppWindow(self)
        self.window.webview.page().profile().clearHttpCache()
        # self.window.webview.page().setLinkDelegationPolicy(QWebPage.DelegateAllLinks)

        parser = getArgsParser()
        args = parser.parse_args(argsv)
        if len(args.url) > 0:
            self.window.loadUrl(args.url[0])
        else:
            self.window.loadUrl('runcy://app/index.html')

        self.window.show()
