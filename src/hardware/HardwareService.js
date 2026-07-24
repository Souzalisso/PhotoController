const HardwareMapper =
    require("../core/services/HardwareMapper");

const LightroomService =
    require("../core/services/LightroomService");

const KeyboardService =
    require("../core/services/KeyboardService");

class HardwareService {

    constructor() {

        this.connected = false;

        this.parser = null;

        this.mapper = null;

        this.controlManager = null;

        this.lightroom = null;

        this.keyboard = null;

    }

    initialize({

        parser,

        mapper,

        controlManager,

        lightroom,

        keyboard

    }) {

        this.parser = parser;

        this.mapper = mapper;

        this.controlManager = controlManager;

        this.lightroom = lightroom;

        this.keyboard = keyboard;

    }

    connect(port = "COM3") {

        try {

            ArduinoProvider.connect(port);

            ArduinoProvider.onData(

                message => this.receive(message)

            );

            this.connected = true;

            EventBus.emit(

                "hardware-connected"

            );

            console.log(

                "KRONOS Hardware conectado."

            );

        }

        catch (error) {

            console.log(

                "Arduino não encontrado."

            );

            this.connected = false;

        }

    }

    disconnect() {

        ArduinoProvider.disconnect();

        this.connected = false;

        EventBus.emit(

            "hardware-disconnected"

        );

    }

    receive(message) {

        if (!this.parser) {

            return;

        }

        const event = this.parser.parse(

            message

        );

        if (!event) {

            return;

        }

        EventBus.emit(

            "hardware-event",

            event

        );

        this.process(event);

    }

    process(event) {

        if (

            !this.mapper ||

            !this.controlManager ||

            !this.lightroom ||

            !this.keyboard

        ) {

            return;

        }

        const mapped = this.mapper.map(

            event

        );

        if (!mapped) {

            return;

        }

        const commandId =

            this.controlManager.getCommand(

                mapped.controlId

            );

        if (!commandId) {

            console.warn(

                `Controle ${mapped.controlId} sem comando.`

            );

            return;

        }

        const command =

            this.lightroom.execute(

                commandId,

                mapped.value

            );

        if (!command) {

            return;

        }

        this.keyboard.execute(

            command.shortcut

        );

    }

    isConnected() {

        return this.connected;

    }

}

module.exports = new HardwareService();