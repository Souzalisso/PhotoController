const path = require("path");
const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");

const EventBus = require("../core/EventBus");
const Application = require("../core/Application");

let mainWindow;

function createWindow() {

    mainWindow = new BrowserWindow({

        width: 1400,
        height: 900,

        minWidth: 1200,
        minHeight: 700,

        title: "KRONOS Controller",

        webPreferences: {

            preload: path.join(
                __dirname,
                "../preload/preload.js"
            ),

            contextIsolation: true,

            nodeIntegration: false

        }

    });

    mainWindow.loadFile(

        path.join(

            __dirname,

            "../renderer/index.html"

        )

    );

    mainWindow.webContents.once(

        "did-finish-load",

        () => {

            mainWindow.webContents.send(

                "hardware-status",

                {

                    connected: false,

                    port: "COM3"

                }

            );

        }

    );

}

ipcMain.handle(

    "ping",

    async () => {

        return "Pong! Electron funcionando.";

    }

);

ipcMain.handle(

    "config:load",

    async () => {

        return Application
            .getControlManager()
            .configuration
            .getAll();

    }

);

ipcMain.handle(

    "config:saveControl",

    async (

        event,

        controlId,

        command

    ) => {

        await Application
            .getControlManager()
            .setCommand(

                controlId,

                command

            );

        console.log(

            `${controlId} -> ${command}`

        );

        return true;

    }

);

ipcMain.handle(

    "hardware:simulateButton",

    async (

        event,

        buttonId

    ) => {

        Application
            .getHardware()
            .simulateButton(

                buttonId

            );

        return true;

    }

);

app.whenReady().then(

    async () => {

        createWindow();

        await Application.start(

            "COM3"

        );

        globalShortcut.register(

            "CommandOrControl+Shift+T",

            () => {

                console.log(

                    "===== TESTE KRONOS ====="

                );

                Application
                    .getHardware()
                    .simulateButton(

                        1

                    );

            }

        );

        EventBus.on(

            "hardware-connected",

            () => {

                if (!mainWindow) {

                    return;

                }

                mainWindow.webContents.send(

                    "hardware-status",

                    {

                        connected: true,

                        port: "COM3"

                    }

                );

            }

        );

        EventBus.on(

            "hardware-disconnected",

            () => {

                if (!mainWindow) {

                    return;

                }

                mainWindow.webContents.send(

                    "hardware-status",

                    {

                        connected: false,

                        port: "--"

                    }

                );

            }

        );

        EventBus.on(

            "hardware-event",

            event => {

                console.log(

                    "Evento:",

                    event

                );

                if (!mainWindow) {

                    return;

                }

                mainWindow.webContents.send(

                    "hardware-event",

                    event

                );

            }

        );

    }

);

app.on(

    "window-all-closed",

    () => {

        if (

            process.platform !== "darwin"

        ) {

            Application.stop();

            app.quit();

        }

    }

);

app.on(

    "activate",

    () => {

        if (

            BrowserWindow.getAllWindows().length === 0

        ) {

            createWindow();

        }

    }

);