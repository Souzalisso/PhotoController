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

        this.boundProviderOpen =
            this.handleProviderOpen.bind(this);

        this.boundProviderClose =
            this.handleProviderClose.bind(this);

        this.boundProviderError =
            this.handleProviderError.bind(this);

        this.listenersAttached = false;
    }


    // =====================================
    // Conectar hardware
    // =====================================

    connect(port = "COM3") {

        try {

            this.attachProviderListeners();

            this.provider.connect(port);

            this.provider.onData(
                message => this.receive(message)
            );

        }
        catch (error) {

            this.connected = false;

            console.error(
                "Erro ao conectar hardware:",
                error
            );
        }
    }


    // =====================================
    // Eventos do Provider
    // =====================================

    attachProviderListeners() {

        if (
            this.listenersAttached ||
            !this.provider
        ) {
            return;
        }


        if (
            this.provider.port &&
            typeof this.provider.port.on === "function"
        ) {

            this.provider.port.on(
                "open",
                this.boundProviderOpen
            );

            this.provider.port.on(
                "close",
                this.boundProviderClose
            );

            this.provider.port.on(
                "error",
                this.boundProviderError
            );

            this.listenersAttached = true;
        }
    }


    handleProviderOpen() {

        if (this.connected) {
            return;
        }


        this.connected = true;

        EventBus.emit(
            "hardware-connected"
        );

        console.log(
            "[KRONOS] Hardware conectado."
        );
    }


    handleProviderClose() {

        if (!this.connected) {
            return;
        }


        this.connected = false;

        EventBus.emit(
            "hardware-disconnected"
        );

        console.log(
            "[KRONOS] Hardware desconectado."
        );
    }


    handleProviderError(error) {

        console.error(
            "[KRONOS] Erro no hardware:",
            error
        );
    }


    // =====================================
    // Desconectar
    // =====================================

    disconnect() {

        if (
            this.provider &&
            typeof this.provider.disconnect === "function"
        ) {

            this.provider.disconnect();
        }


        this.connected = false;
    }


    // =====================================
    // Receber dados
    // =====================================

    receive(message) {

        const parsed =
            this.parser.parse(message);


        if (!parsed) {
            return;
        }


        EventBus.emit(
            "hardware-event",
            parsed
        );


        this.process(parsed);
    }


    // =====================================
    // Processar evento
    // =====================================

    async process(event) {

        const control =
            this.mapper.map(event);


        if (!control) {
            return;
        }


        const commandId =
            this.controlManager.getCommand(
                control.id
            );


        if (!commandId) {
            return;
        }


        const shortcut =
            this.lightroomService.getShortcut(
                commandId
            );


        if (!shortcut) {
            return;
        }


        await this.keyboardService.execute(
            shortcut
        );
    }


    // =====================================
    // Simulação
    // =====================================

    simulateButton(id) {

        this.process({

            device: "SIM",

            type: "BTN",

            id,

            value: "PRESS"

        });
    }


    // =====================================
    // Status
    // =====================================

    isConnected() {

        return this.connected;
    }
}


module.exports = HardwareService;