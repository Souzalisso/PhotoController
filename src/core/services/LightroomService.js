const LightroomCommands = require("../data/lightroom/LightroomCommands");
const KeyboardService = require("./KeyboardService");

class LightroomService {

    constructor() {

        this.commands = LightroomCommands;

    }

    getCommand(commandId) {

        return this.commands.find(

            command => command.id === commandId

        );

    }

    async execute(commandId) {

        const command = this.getCommand(

            commandId

        );

        if (!command) {

            console.warn(

                `Comando inexistente: ${commandId}`

            );

            return;

        }

        console.log(

            `Executando: ${command.name}`

        );

        await KeyboardService.execute(

            command.shortcut

        );

    }

    getCommands() {

        return this.commands;

    }

    getByCategory(category) {

        return this.commands.filter(

            command => command.category === category

        );

    }

}

module.exports = new LightroomService();