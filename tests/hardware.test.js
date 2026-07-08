const HardwareService = require("../src/services/HardwareService");
const EventBus = require("../src/services/EventBus");

console.log("=== Teste HardwareService ===");

EventBus.on("hardware-connected", () => {

    console.log("Hardware conectado!");

});

EventBus.on("hardware-event", (event) => {

    console.log("Evento recebido:");

    console.log(event);

});

HardwareService.connect();

HardwareService.receive("KRN|BTN|05|PRESS");

HardwareService.receive("KRN|ENC|01|-1");

HardwareService.receive("KRN|POT|03|742");