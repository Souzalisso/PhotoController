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

    const command = configuration.buttons[event.id];

    if (!command) {

        console.log(`BTN ${event.id} não configurado.`);

        return;

    }

    console.log(`Executando comando: ${command}`);

    KeyboardManager.execute(command);

}

}

module.exports = new HardwareController();