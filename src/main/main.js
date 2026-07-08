const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const HardwareService = require("../hardware/HardwareService");

function createWindow() {

    const mainWindow = new BrowserWindow({

        width: 1400,
        height: 850,

        minWidth: 1100,
        minHeight: 700,

        title: "KRONOS Controller",

        autoHideMenuBar: true,

        webPreferences: {
            preload: path.join(__dirname, "../preload/preload.js"),
            contextIsolation: true,
            nodeIntegration: false
        }

    });

    mainWindow.loadFile(
        path.join(__dirname, "../renderer/index.html")
    );

}

ipcMain.handle("ping", () => {
    return "Pong! Electron está funcionando.";
});

app.whenReady().then(() => {

    createWindow();

    HardwareService.connect("COM3");

});

app.on("window-all-closed", () => {

    if (process.platform !== "darwin") {
        app.quit();
    }

});