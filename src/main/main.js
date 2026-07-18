const path = require("path");
const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");

const EventBus = require("../core/EventBus");
const HardwareService = require("../hardware/HardwareService");
const ConfigurationManager = require("../core/ConfigurationManager");

require("../controllers/HardwareController");

let mainWindow;

function createWindow() {

    mainWindow = new BrowserWindow({

    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,

    title: "KRONOS Controller",

    webPreferences: {

        preload: path.join(__dirname, "../preload/preload.js"),

        contextIsolation: true,

        nodeIntegration: false

    }

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

ipcMain.handle("config:load", () => {

    return ConfigurationManager.load();

});

ipcMain.handle("config:saveControl", (event, controlId, command) => {

    const configuration = ConfigurationManager.load();

    configuration.controls[controlId] = command;

    ConfigurationManager.save(configuration);

    console.log(`${controlId} -> ${command}`);

    return true;

});

ipcMain.handle("hardware:simulateButton", (event, buttonId) => {

    EventBus.emit("hardware-event", {

        device: "SIM",
        type: "BTN",
        id: buttonId,
        value: "PRESS"

    });

    return true;

});

app.whenReady().then(() => {

    createWindow();

    globalShortcut.register("CommandOrControl+Shift+T", () => {

    console.log("===== TESTE KRONOS =====");

    EventBus.emit("hardware-event", {

        device: "SIM",
        type: "BTN",
        id: 1,
        value: "PRESS"

    });

});

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