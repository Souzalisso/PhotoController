const EventBus = require("../core/EventBus");

class SimulatorProvider {

    constructor() {

        this.connected = false;

    }

    connect() {

        this.connected = true;

        console.log("Simulador conectado.");

    }

    disconnect() {

        this.connected = false;

        console.log("Simulador desconectado.");

    }

    simulateButton(id) {

        EventBus.emit("hardware-event", {

            type: "BTN",

            id,

            action: "PRESS"

        });

    }

    simulateEncoder(id, direction) {

        EventBus.emit("hardware-event", {

            type: "ENC",

            id,

            direction

        });

    }

    simulatePotentiometer(id, value) {

        EventBus.emit("hardware-event", {

            type: "POT",

            id,

            value

        });

    }

}

module.exports = new SimulatorProvider();