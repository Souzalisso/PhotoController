import LightroomCommands from "../data/lightroom/LightroomCommands.js";

export default class LightroomService {

    constructor() {

        this.commands = LightroomCommands;

    }

    getCommands() {

        return this.commands;

    }

    getCommand(id) {

        return this.commands.find(

            command => command.id === id

        ) || null;

    }

    execute(id) {

        const command = this.getCommand(id);

        if (!command) {

            console.warn(

                `Comando "${id}" não encontrado.`

            );

            return false;

        }

        console.log(

            "[LIGHTROOM]",

            command.name,

            command.shortcut

        );

        /*
            Aqui futuramente será feita
            a integração com o Lightroom.
        */

        return true;

    }

}