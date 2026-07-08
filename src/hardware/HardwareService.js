const EventBus = require("../core/EventBus");
const parser = require("./ProtocolParser");
const ArduinoProvider = require("./ArduinoProvider");

class HardwareService {

    constructor() {

        this.connected = false;

    }

    connect(port = "COM3") {

        ArduinoProvider.connect(port);

        ArduinoProvider.onData((message) => {

            this.receive(message);

        });

        this.connected = true;

        EventBus.emit("hardware-connected");

    }

    disconnect() {

        ArduinoProvider.disconnect();

        this.connected = false;

        EventBus.emit("hardware-disconnected");

    }

    receive(message) {

        const event = parser.parse(message);

        if (!event) return;

        EventBus.emit("hardware-event", event);

    }

}

module.exports = new HardwareService();