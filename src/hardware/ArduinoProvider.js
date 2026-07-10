const { SerialPort } = require("serialport");

class ArduinoProvider {

    constructor() {

        this.port = null;

    }

    connect(portName = "COM3") {

        this.port = new SerialPort({

            path: portName,
            baudRate: 9600,
            autoOpen: true

        });

        this.port.on("open", () => {

            console.log("Arduino conectado.");

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

        this.port = null;

    }

}

module.exports = new ArduinoProvider();