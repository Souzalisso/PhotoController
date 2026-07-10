const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const HardwareService = require("../hardware/HardwareService");

let mainWindow;

/**
 * Cria a janela principal da aplicação.
 */
function createWindow() {

    mainWindow = new BrowserWindow({

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

/**
 * Canal de teste
 */
ipcMain.handle("ping", async () => {

    return "Pong! Electron está funcionando.";

});

/**
 * Inicialização
 */
app.whenReady().then(() => {

    createWindow();

    // Futuramente essa porta será detectada automaticamente.
    HardwareService.connect("COM3");

});

/**
 * Fecha aplicação
 */
app.on("window-all-closed", () => {

    if (process.platform !== "darwin") {

        app.quit();

    }

});

app.on("activate", () => {

    if (BrowserWindow.getAllWindows().length === 0) {

        createWindow();

    }

});