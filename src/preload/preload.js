const { ipcRenderer } = require("electron");


window.photoController = {

    // =====================================
    // Hardware
    // =====================================

    simulateButton: (buttonId) =>
        ipcRenderer.invoke(
            "hardware:simulateButton",
            buttonId
        ),


    simulateEncoder: (encoderId, value) =>
        ipcRenderer.invoke(
            "hardware:simulateEncoder",
            encoderId,
            value
        ),


    // =====================================
    // Teste
    // =====================================

    ping: () =>
        ipcRenderer.invoke("ping"),


    // =====================================
    // Configuração - comando normal
    // =====================================

    saveControl: (
        controlId,
        command
    ) =>
        ipcRenderer.invoke(
            "config:saveControl",
            controlId,
            command
        ),


    // =====================================
    // Configuração - encoder horário
    // =====================================

    saveClockwiseCommand: (
        controlId,
        command
    ) =>
        ipcRenderer.invoke(
            "config:saveClockwiseCommand",
            controlId,
            command
        ),


    // =====================================
    // Configuração - encoder anti-horário
    // =====================================

    saveCounterClockwiseCommand: (
        controlId,
        command
    ) =>
        ipcRenderer.invoke(
            "config:saveCounterClockwiseCommand",
            controlId,
            command
        ),


    // =====================================
    // Carregar configuração
    // =====================================

    loadConfiguration: () =>
        ipcRenderer.invoke(
            "config:load"
        ),


    // =====================================
    // Eventos do hardware
    // =====================================

    onHardwareEvent: (callback) => {

        ipcRenderer.on(
            "hardware-event",
            (_, event) => {

                callback(event);
            }
        );
    },


    onHardwareStatus: (callback) => {

        ipcRenderer.on(
            "hardware-status",
            (_, status) => {

                callback(status);
            }
        );
    }
};