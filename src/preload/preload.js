const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("photoController", {
    simulateButton: (buttonId) =>
    ipcRenderer.invoke("hardware:simulateButton", buttonId),

    ping: () => ipcRenderer.invoke("ping"),

    saveButton: (buttonId, command) =>
        ipcRenderer.invoke("config:saveButton", buttonId, command),

    loadConfiguration: () =>
        ipcRenderer.invoke("config:load"),

    onHardwareEvent: (callback) => {

        ipcRenderer.on("hardware-event", (_, event) => {

            callback(event);

        });

    },

    onHardwareStatus: (callback) => {

        ipcRenderer.on("hardware-status", (_, status) => {

            callback(status);

        });

    }

});