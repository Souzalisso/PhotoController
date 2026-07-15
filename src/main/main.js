const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const EventBus = require("../core/EventBus");
const HardwareService = require("../hardware/HardwareService");

let mainWindow;

function createWindow() {

    mainWindow = new BrowserWindow({

        // ...

    });

    mainWindow.loadFile(
        path.join(__dirname, "../renderer/index.html")
    );

    mainWindow.webContents.once("did-finish-load", () => {

        mainWindow.webContents.send("hardware-status", {

            connected: false,
            port: "COM3"

        });

    });

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