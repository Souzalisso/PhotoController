const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const { SerialPort } = require("serialport");
const comandos = require("./commands");

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

let port;

function conectarArduino() {

    port = new SerialPort({
        path: "COM3", // depois você ajusta isso
        baudRate: 9600
    });

    port.on("open", () => {
        console.log("🔌 Arduino conectado!");
    });

    port.on("data", (data) => {

        const comando = data.toString().trim();

        console.log("📩 Recebido:", comando);

        if (comandos[comando]) {
            comandos[comando]();
        } else {
            console.log("⚠️ Comando desconhecido:", comando);
        }

    });
}

/**
 * Canal de teste entre Renderer e Main
 */
ipcMain.handle("ping", () => {
    return "Pong! Electron está funcionando.";
});

app.whenReady().then(() => {
    createWindow();
    conectarArduino();
});

app.on("window-all-closed", () => {

    if (process.platform !== "darwin") {
        app.quit();
    }

});