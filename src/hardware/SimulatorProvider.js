class SimulatorProvider {

    constructor(eventManager) {

        this.connected = false;

        this.eventManager = eventManager;

    }

    connect() {

        this.connected = true;

        console.log("Simulator conectado.");

    }

    disconnect() {

        this.connected = false;

    }

    simulateButton(id) {

        this.eventManager.emit("hardware:event", {

            type: "button",

            id: id,

            action: "press"

        });

    }

    simulateEncoder(id, direction) {

        this.eventManager.emit("hardware:event", {

            type: "encoder",

            id: id,

            direction: direction

        });

    }

}

module.exports = SimulatorProvider;