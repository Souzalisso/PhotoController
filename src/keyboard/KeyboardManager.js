const { keyboard } = require("@nut-tree-fork/nut-js");
const LightroomKeyMap = require("./LightroomKeyMap");

class KeyboardManager {

    async execute(command) {

        const keys = LightroomKeyMap[command];

        if (!keys) {

            console.log(`Comando não encontrado: ${command}`);

            return;

        }

        try {

            console.log(`Executando: ${command}`);

            // Pressiona as teclas na ordem correta
            await keyboard.pressKey(...keys);

            // Solta as teclas na ordem inversa
            await keyboard.releaseKey(...[...keys].reverse());

            console.log("Tecla enviada com sucesso.");

        } catch (error) {

            console.error("Erro ao enviar tecla:", error);

        }

    }

}

module.exports = new KeyboardManager();