import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

class ArduinoProvider {

    constructor() {

        this.port = null;
        this.parser = null;
        this.connected = false;

    }

    connect(portName = "COM3", baudRate = 115200) {

        if (this.connected) {

            return;

        }

        this.port = new SerialPort({

            path: portName,
            baudRate,
            autoOpen: true

        });

        this.parser = this.port.pipe(

            new ReadlineParser({

                delimiter: "\n"

            })

        );

        this.connected = true;

        console.log(

            `Arduino conectado em ${portName}`

        );

    }

    disconnect() {

        if (!this.port) {

            return;

        }

        this.port.close();

        this.port = null;
        this.parser = null;
        this.connected = false;

    }

    onData(callback) {

        if (!this.parser) {

            return;

        }

        this.parser.on(

            "data",

            callback

        );

    }

    isConnected() {

        return this.connected;

    }

}

export default new ArduinoProvider();