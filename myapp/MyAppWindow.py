from luminos.windows.BrowserWindow import BrowserWindow
from luminos.core.Bridge import BridgeObject, Bridge
from luminos.utils import config

class MyAppWindow(BrowserWindow):
  def __init__(self, app):
      super().__init__(app)
      self.setWindowTitle("Luminos React Starter")
