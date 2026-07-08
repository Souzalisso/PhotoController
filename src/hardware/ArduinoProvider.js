const { SerialPort } = require("serialport");

class ArduinoProvider {

    constructor() {
        this.port = null;
    }

    connect(portName = "COM3", baudRate = 9600) {

        this.port = new SerialPort({
            path: portName,
            baudRate
        });

        this.port.on("open", () => {
            console.log("🔌 Arduino conectado.");
        });

        this.port.on("error", (err) => {
            console.error("Erro Serial:", err.message);
        });

    }

    onData(callback) {

        if (!this.port) return;

        this.port.on("data", (data) => {
            callback(data.toString().trim());
        });

    }

    disconnect() {

        if (this.port && this.port.isOpen) {
            this.port.close();
        }

    }

}

module.exports = new ArduinoProvider();