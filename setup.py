import os
import sys
import atexit
from os import path
from setuptools import setup, find_packages
from subprocess import call

try:
    BASEDIR = path.dirname(path.realpath(__file__))
except NameError:
    BASEDIR = None


def hasWriteAccess(p: str):
    if not path.exists(path.abspath(p)):
        return path.exists(path.dirname(p)) and os.access(path.abspath(p), os.W_OK)
    else:
        return os.access(path.abspath(p), os.W_OK)


def _post_install():
    if hasWriteAccess('/usr/share'):
        datadir = '/usr/share'
        os.makedirs(path.join(datadir, 'myapp'), 0o755, exist_ok=True)
    else:
        datadir = path.expanduser('~/.local/share')
        os.makedirs(path.join(datadir, 'myapp'), 0o755, exist_ok=True)

    print("Updating icon cache...")
    call(["gtk-update-icon-cache", "-qtf", path.join(datadir, "icons", "hicolor")])

    print("Updating desktop database...")
    call(["update-desktop-database", "-q", path.join(datadir, "applications")])

    print("Compiling GSettings schemas...")
    call(["glib-compile-schemas", path.join(datadir, "glib-2.0", "schemas")])


# prevent postinstall from running when building distributable tar archive
args = sys.argv[1:]
if len(args) > 0 and args[0] != 'sdist':
    atexit.register(_post_install)


def read_requirements(name: str) -> list:
    filepath = os.path.join(BASEDIR, name)
    requirements = []
    with open(filepath) as fp:
        line = fp.readline()
        cnt = 1
        while line:
            requirements.append(line.strip())
            line = fp.readline()
            cnt += 1

    return requirements


# Get the long description from the README file
with open(os.path.join(BASEDIR, 'README.md'), encoding='utf-8') as f:
    long_description = f.read()

setup(
    name="myapp",
    version="1.0.0",
    python_requires='>=3.5',
    packages=find_packages(exclude=['tests', 'tests.*', 'plugins', 'plugins.*']),
    url="https://gitlab.com/fisma/luminos",
    license="MIT",
    author="Fisma Team",
    author_email="myemail@address.com",
    description="Luminos quick start application.",
    long_description=long_description,
    long_description_content_type='text/markdown',  # Optional (see note above)
    install_requires=read_requirements('requirements.txt'),
    keywords="desktop-application javascript html5 css",
)
