const EventManager = require("./src/services/EventManager");

const events = new EventManager();

events.on("teste", (mensagem) => {

    console.log("Recebido:", mensagem);

});

events.emit("teste", "Olá Photo Controller!");