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

    HardwareService.connect("COM3");

    EventBus.on("hardware-connected", () => {

        if (mainWindow) {

            mainWindow.webContents.send("hardware-status", {

                connected: true,
                port: "COM3"

            });

        }

    });

    EventBus.on("hardware-disconnected", () => {

        if (mainWindow) {

            mainWindow.webContents.send("hardware-status", {

                connected: false,
                port: "--"

            });

        }

    });

    EventBus.on("hardware-event", (event) => {

        console.log("Evento:", event);

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