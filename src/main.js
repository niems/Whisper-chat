const electron = require('electron');

// control application's life
const app = electron.app;

const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
});

// Module to create native browser window
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

/*  Keep a global reference of the window object, if you don't, the window
  will be closed automatically when the JS object is garbage collected. */
let mainWindow;
const opts = {
    alwaysOnTop: false,
    frame: false,
    minWidth: 600,
    minHeight: 450,
    width: 600,
    height: 450,
};

function createWindow() {
    // creates browser window
    mainWindow = new BrowserWindow(opts);

    // load the index.html of the app
    mainWindow.loadURL(startUrl); 

    // open devtools
    // mainWindow.webContents.openDevTools();

    // Emitted when window is closed
    mainWindow.on('closed', () => {
        /*  deref. window object - you could store windows in an array since 
          it's going to support multiple windows. This is the place to delete
          the dependent windows as well as mainWindow
        */

        mainWindow = null;
    });
}

/*  This method will be called when Electron has finished initialization and is ready to create browser windows.
  Some APIs can only be used after this event occurs. */
app.on('ready', createWindow);


// Quit when all windows are closed.
app.on('window-all-closed', () => {
    /*  On OS X it's common for applications and their menu bar to
      stay active until the user quits explicitly with Cmd + Q */ 
      if ( process.platform !== 'darwin' ) {
          app.quit();
      }
});


app.on('activate', () => {
    /*  On OS X it's common to re-create a window in the app when the dock
      icon is clicked and there are no other windows open. */
    if ( mainWindow === null ) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.