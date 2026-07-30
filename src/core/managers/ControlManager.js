const KronosControls = require("../../renderer/designer/KronosControls");
const ConfigurationManager = require("./ConfigurationManager");

class ControlManager {

    constructor() {

        this.configuration = new ConfigurationManager();

        this.selectedControl = null;

    }

    async load() {

        await this.configuration.load();

    }

    getControls() {

        return KronosControls.all;

    }

    getControl(id) {

        return KronosControls.findById(id);

    }

    getButtons() {

        return KronosControls.getButtons();

    }

    getEncoders() {

        return KronosControls.getEncoders();

    }

    getDisplays() {

        return KronosControls.getDisplays();

    }

    getCommand(controlId) {

        return this.configuration.get(controlId);

    }

    async setCommand(controlId, commandId) {

        this.configuration.set(

            controlId,

            commandId

        );

        await this.configuration.save();

    }

    removeCommand(controlId) {

        this.configuration.remove(controlId);

    }

    hasCommand(controlId) {

        return this.configuration.has(controlId);

    }

    async resetConfiguration() {

        await this.configuration.reset();

    }

    select(controlId) {

        this.selectedControl = controlId;

    }

    clearSelection() {

        this.selectedControl = null;

    }

    getSelected() {

        return this.selectedControl;

    }

    isSelected(controlId) {

        return this.selectedControl === controlId;

    }

    getSelectedControl() {

        if (!this.selectedControl) {

            return null;

        }

        return this.getControl(this.selectedControl);

    }

}

module.exports = ControlManager;