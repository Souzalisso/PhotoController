const EventBus = require("../core/EventBus");

class HardwareService {

    constructor({

        provider,
        parser,
        mapper,
        controlManager,
        lightroomService,
        keyboardService

    }) {

        this.provider = provider;
        this.parser = parser;
        this.mapper = mapper;

        this.controlManager = controlManager;
        this.lightroomService = lightroomService;
        this.keyboardService = keyboardService;

        this.connected = false;

    }

    connect(port = "COM3") {

        try {

            this.provider.connect(port);

            this.provider.onData(

                message => this.receive(message)

            );

            this.connected = true;

            EventBus.emit("hardware-connected");

            console.log("Hardware conectado.");

        }

        catch (error) {

            console.error(

                "Erro ao conectar hardware:",

                error

            );

        }

    }

    disconnect() {

        if (this.provider.disconnect) {

            this.provider.disconnect();

        }

        this.connected = false;

        EventBus.emit(

            "hardware-disconnected"

        );

    }

    receive(message) {

        const parsed = this.parser.parse(

            message

        );

        if (!parsed) {

            return;

        }

        EventBus.emit(

            "hardware-event",

            parsed

        );

        this.process(parsed);

    }

    async process(event) {

        const control = this.mapper.map(

            event

        );

        if (!control) {

            return;

        }

        const commandId = this.controlManager.getCommand(

            control.id

        );

        if (!commandId) {

            return;

        }

        const shortcut = this.lightroomService.getShortcut(

            commandId

        );

        if (!shortcut) {

            return;

        }

        await this.keyboardService.execute(

            shortcut

        );

    }

    simulateButton(id) {

        this.process({

            device: "SIM",

            type: "BTN",

            id,

            value: "PRESS"

        });

    }

    isConnected() {

        return this.connected;

    }

}

module.exports = HardwareService;