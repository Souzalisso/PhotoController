const EventBus = require("../core/EventBus");
const ConfigurationManager = require("../core/ConfigurationManager");
const KeyboardManager = require("../keyboard/KeyboardManager");

class HardwareController {

    constructor() {

        EventBus.on("hardware-event", this.handleEvent.bind(this));

    }

    async handleEvent(event) {

    console.log("Evento recebido:", event);

    const configuration = ConfigurationManager.load();

    const command = configuration.controls[event.id];

    if (!command) {

        console.log("Controle não configurado.");

        return;

    }

    await KeyboardManager.execute(command);

}
    }

    const command = configuration.buttons[event.id];

    if (!command) {

        console.log(`BTN ${event.id} não configurado.`);

        return;

    }

    console.log(`Executando comando: ${command}`);

    KeyboardManager.execute(command);




module.exports = new HardwareController();