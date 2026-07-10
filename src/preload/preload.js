const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("photoController", {

    ping: () => ipcRenderer.invoke("ping"),

    onHardwareEvent(callback) {

        ipcRenderer.on("hardware-event", (_, event) => {

            callback(event);

        });

    }

});