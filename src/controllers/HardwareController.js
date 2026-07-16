const EventBus = require("../core/EventBus");
const ConfigurationManager = require("../core/ConfigurationManager");
const KeyboardManager = require("../keyboard/KeyboardManager");

class HardwareController {

    constructor() {

        EventBus.on("hardware-event", this.handleEvent.bind(this));

    }

    handleEvent(event) {

        console.log("Evento recebido:", event);

        const configuration = ConfigurationManager.load();

        if (!configuration) {

            console.log("Nenhuma configuração encontrada.");

            return;

        }

        const button = configuration.buttons?.find(btn => btn.id === event.id);

        if (!button) {

            console.log("Botão não configurado.");

            return;

        }

        KeyboardManager.execute(button.command);

    }

}

module.exports = new HardwareController();