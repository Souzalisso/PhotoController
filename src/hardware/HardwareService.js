const EventBus = require("../core/EventBus");
const ProtocolParser = require("../protocol/ProtocolParser");
const ArduinoProvider = require("./ArduinoProvider");

class HardwareService {

    constructor() {

        this.connected = false;

    }

    connect(port = "COM3") {

        try {

            ArduinoProvider.connect(port);

            ArduinoProvider.onData((message) => {

                this.receive(message);

            });

            this.connected = true;

            EventBus.emit("hardware-connected");

            console.log("Hardware conectado.");

        } catch (error) {

            console.log("Nenhum Arduino encontrado.");

            this.connected = false;

        }

    }

    disconnect() {

        ArduinoProvider.disconnect();

        this.connected = false;

        EventBus.emit("hardware-disconnected");

    }

    receive(message) {

        const event = ProtocolParser.parse(message);

        if (!event) return;

        EventBus.emit("hardware-event", event);

    }

    isConnected() {

        return this.connected;

    }

}

module.exports = new HardwareService();