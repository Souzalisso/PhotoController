const LightroomCommands = require("../data/lightroom/LightroomCommands");

class LightroomService {

    constructor() {

        this.commands = LightroomCommands;

    }

    getCommand(commandId) {

        return this.commands.find(

            command => command.id === commandId

        ) || null;

    }

    getShortcut(commandId) {

        const command = this.getCommand(commandId);

        if (!command) {

            return null;

        }

        return command.shortcut;

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