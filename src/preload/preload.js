const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("photoController", {

    ping: () => ipcRenderer.invoke("ping")

});