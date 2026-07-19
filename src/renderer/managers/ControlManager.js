export default class ControlManager {

    constructor() {

        this.configuration = {

            controls: {}

        };

    }

    async load() {

        const config = await window.photoController.loadConfiguration();

        this.configuration = config || {

            controls: {}

        };

    }

    getCommand(controlId) {

        return this.configuration.controls[controlId] || "";

    }

    async setCommand(controlId, command) {

        this.configuration.controls[controlId] = command;

        await window.photoController.saveControl(

            controlId,

            command

        );

    }

}