const parser = require("../src/protocol/ProtocolParser");

const mensagens = [

    "KRN|BTN|05|PRESS",

    "KRN|BTN|05|RELEASE",

    "KRN|ENC|02|-1",

    "KRN|ENC|02|1",

    "KRN|POT|04|735"

];

for (const mensagem of mensagens) {

    console.log("--------------------------------");

    console.log("Mensagem:");

    console.log(mensagem);

    console.log("Objeto:");

    console.log(parser.parse(mensagem));

}