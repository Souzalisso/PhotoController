const { SerialPort } = require("serialport");

class HardwareManager {

    constructor() {

        this.port = null;

        this.connected = false;

    }

    async listPorts() {

        try {

            const ports = await SerialPort.list();

            return ports;

        } catch (error) {

            console.error("Erro ao listar portas:", error);

            return [];

        }

    }

}

module.exports = HardwareManager;