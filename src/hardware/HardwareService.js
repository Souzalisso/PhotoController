import EventBus from "../core/EventBus.js";
import ArduinoProvider from "./ArduinoProvider.js";

export default class HardwareService {

    constructor({

        parser,

        mapper,

        controlManager,

        lightroomService,

        keyboardService

    }) {

        this.connected = false;

        this.parser = parser;

        this.mapper = mapper;

        this.controlManager = controlManager;

        this.lightroomService = lightroomService;

        this.keyboardService = keyboardService;

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

            console.error(

                "Erro ao conectar Arduino:",

                error

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

        const mappedControl = this.mapper.map(event);

        if (!mappedControl) {

            console.warn(

                "Controle não encontrado:",

                event

            );

            return;

        }

        const commandId = this.controlManager.getCommand(

            mappedControl.id

        );

        if (!commandId) {

            console.warn(

                `Controle ${mappedControl.id} sem comando.`

            );

            return;

        }

        const command = this.lightroomService.execute(

            commandId,

            mappedControl.value

        );

        if (!command) {

            return;

        }

        this.keyboardService.execute(

            command.shortcut

        );

    }

    isConnected() {

        return this.connected;

    }

}