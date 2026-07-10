const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const EventBus = require("../core/EventBus");
const HardwareService = require("../hardware/HardwareService");

let mainWindow;

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

ipcMain.handle("ping", async () => {

    return "Pong! Electron está funcionando.";

});

app.whenReady().then(() => {

    createWindow();

    console.log("KRONOS iniciado.");

    EventBus.on("hardware-event", (event) => {

        console.log("Evento recebido:", event);

        if (mainWindow) {

            mainWindow.webContents.send("hardware-event", event);

        }

    });

});

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