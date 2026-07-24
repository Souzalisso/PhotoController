import LightroomCommands from "../data/lightroom/LightroomCommands.js";

export default class LightroomService {

    constructor() {

        this.commands = new Map();

        this.loadCommands();

    }

    loadCommands() {

        LightroomCommands.forEach(command => {

            this.commands.set(

                command.id,

                command

            );

        });

    }

    getCommand(commandId) {

        return this.commands.get(commandId) || null;

    }

    execute(commandId, value = null) {

        const command = this.getCommand(commandId);

        if (!command) {

            console.warn(

                `Comando inexistente: ${commandId}`

            );

            return false;

        }

        console.group(

            "KRONOS"

        );

        console.log(

            "Executando:",

            command.name

        );

        console.log(

            "Shortcut:",

            command.shortcut

        );

        if (value !== null) {

            console.log(

                "Valor:",

                value

            );

        }

        console.groupEnd();

        return command;

    }

    getAllCommands() {

        return Array.from(

            this.commands.values()

        );

    }

    hasCommand(commandId) {

        return this.commands.has(

            commandId

        );

    }

}