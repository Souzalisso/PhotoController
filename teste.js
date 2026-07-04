const HardwareManager = require("./src/services/HardwareManager");

async function main() {
    const hardware = new HardwareManager();

    const ports = await hardware.listPorts();

    console.log(ports);
}

main();