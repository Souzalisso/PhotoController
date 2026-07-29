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

            EventBus.emit(

                "hardware-connected"

            );

            console.log(

                "Hardware conectado."

            );

        }

        catch (error) {

            console.error(

                "Erro ao conectar hardware:",

                error

            );

        }

    }

    disconnect() {

        this.provider.disconnect();

        this.connected = false;

        EventBus.emit(

            "hardware-disconnected"

        );

    }

    receive(message) {

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

    async process(event) {

        const control = this.mapper.map(

            event

        );

        if (!control) {

            console.warn(

                "Controle não encontrado.",

                event

            );

            return;

        }

        const commandId = this.controlManager.getCommand(

            control.id

        );

        if (!commandId) {

            console.warn(

                `${control.id} sem comando.`

            );

            return;

        }

        const shortcut = this.lightroomService.getShortcut(

            commandId

        );

        if (!shortcut) {

            console.warn(

                `${commandId} sem atalho.`

            );

            return;

        }

        await this.keyboardService.execute(

            shortcut

        );

    }

    isConnected() {

        return this.connected;

    }

}

module.exports = HardwareService;