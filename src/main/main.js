const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

/**
 * Cria a janela principal da aplicação.
 */
function createWindow() {

    const mainWindow = new BrowserWindow({

        width: 1400,
        height: 850,

        minWidth: 1100,
        minHeight: 700,

        title: "Photo Controller",

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
 * Canal de teste entre Renderer e Main
 */
ipcMain.handle("ping", () => {
    return "Pong! Electron está funcionando.";
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {

    if (process.platform !== "darwin") {
        app.quit();
    }

});