const ArduinoProvider = require("../hardware/ArduinoProvider");
const ProtocolParser = require("../protocol/ProtocolParser");

const HardwareMapper = require("./services/HardwareMapper");
const KeyboardService = require("./services/KeyboardService");
const LightroomService = require("./services/LightroomService");

const ControlManager = require("./managers/ControlManager");

const HardwareService = require("../hardware/HardwareService");

class Application {

    constructor() {

        this.controlManager = new ControlManager();

        this.hardwareService = new HardwareService({

            provider: ArduinoProvider,

            parser: ProtocolParser,

            mapper: HardwareMapper,

            controlManager: this.controlManager,

            lightroomService: LightroomService,

            keyboardService: KeyboardService

        });

    }

    async start(port = "COM3") {

        await this.controlManager.load();

        this.hardwareService.connect(port);

        console.log("KRONOS iniciado.");

    }

    stop() {

        this.hardwareService.disconnect();

    }

    getHardware() {

        return this.hardwareService;

    }

    getControlManager() {

        return this.controlManager;

    }

}

module.exports = new Application();