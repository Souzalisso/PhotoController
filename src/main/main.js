const path = require("path");

const {
    app,
    BrowserWindow,
    ipcMain,
    globalShortcut
} = require("electron");

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

            nodeIntegration: true,

            contextIsolation: false,

            sandbox: false
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


/* ================================
   IPC
================================ */


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


/* ================================
   IPC - ENCODER HORÁRIO
================================ */


ipcMain.handle(
    "config:saveClockwiseCommand",
    async (
        event,
        controlId,
        command
    ) => {

        await Application
            .getControlManager()
            .setClockwiseCommand(
                controlId,
                command
            );


        console.log(
            `[KRONOS] ${controlId} horário -> ${command}`
        );


        return true;
    }
);


/* ================================
   IPC - ENCODER ANTI-HORÁRIO
================================ */


ipcMain.handle(
    "config:saveCounterClockwiseCommand",
    async (
        event,
        controlId,
        command
    ) => {

        await Application
            .getControlManager()
            .setCounterClockwiseCommand(
                controlId,
                command
            );


        console.log(
            `[KRONOS] ${controlId} anti-horário -> ${command}`
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


ipcMain.handle(
    "hardware:simulateEncoder",
    async (
        event,
        encoderId,
        value
    ) => {

        Application
            .getHardware()
            .simulateEncoder(
                encoderId,
                value
            );


        return true;
    }
);


/* ================================
   APPLICATION
================================ */


app.whenReady().then(
    async () => {

        createWindow();


        await Application.start(
            "COM3"
        );


        /* ============================
           GLOBAL SHORTCUT
        ============================ */


        globalShortcut.register(
            "CommandOrControl+Shift+T",
            () => {

                console.log(
                    "===== TESTE KRONOS ====="
                );


                Application
                    .getHardware()
                    .simulateButton(
                        15
                    );
            }
        );


        globalShortcut.register(
            "CommandOrControl+Shift+E",
            () => {

                Application
                    .getHardware()
                    .simulateEncoder(
                        1,
                        1
                    );
            }
        );


        globalShortcut.register(
            "CommandOrControl+Shift+Q",
            () => {

                Application
                    .getHardware()
                    .simulateEncoder(
                        1,
                        -1
                    );
            }
        );


        /* ============================
           HARDWARE CONNECTED
        ============================ */


        EventBus.on(
            "hardware-connected",
            () => {

                if (
                    !mainWindow ||
                    mainWindow.isDestroyed() ||
                    mainWindow.webContents.isDestroyed()
                ) {

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


        /* ============================
           HARDWARE DISCONNECTED
        ============================ */


        EventBus.on(
            "hardware-disconnected",
            () => {

                if (
                    !mainWindow ||
                    mainWindow.isDestroyed() ||
                    mainWindow.webContents.isDestroyed()
                ) {

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


        /* ============================
           HARDWARE EVENT
        ============================ */


        EventBus.on(
            "hardware-event",
            (event) => {

                console.log(
                    "Evento:",
                    event
                );


                if (
                    !mainWindow ||
                    mainWindow.isDestroyed() ||
                    mainWindow.webContents.isDestroyed()
                ) {

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


/* ================================
   APPLICATION CLOSE
================================ */


app.on(
    "window-all-closed",
    () => {

        globalShortcut.unregisterAll();


        if (
            process.platform !== "darwin"
        ) {

            Application.stop();

            app.quit();
        }
    }
);


/* ================================
   MACOS ACTIVATE
================================ */


app.on(
    "activate",
    () => {

        if (
            BrowserWindow
                .getAllWindows()
                .length === 0
        ) {

            createWindow();
        }
    }
);