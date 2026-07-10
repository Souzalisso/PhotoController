const { SerialPort } = require("serialport");

class ArduinoProvider {

    constructor() {
        this.port = null;
    }

    connect(portName = "COM3") {

        this.port = new SerialPort({
            path: portName,
            baudRate: 9600
        });

        this.port.on("open", () => {
            console.log("Arduino conectado.");
        });

        return this.port;
    }

}

module.exports = ArduinoProvider;