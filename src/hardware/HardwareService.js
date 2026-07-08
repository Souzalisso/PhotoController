const EventBus = require("./EventBus");
const parser = require("../protocol/ProtocolParser");

class HardwareService {

    constructor() {

        this.connected = false;

    }

    connect() {

        console.log("Conectando ao KRONOS...");

        this.connected = true;

        EventBus.emit("hardware-connected");

    }

    disconnect() {

        console.log("KRONOS desconectado.");

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