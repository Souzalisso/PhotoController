import KronosControls from "../designer/KronosControls.js";
import ConfigurationManager from "./ConfigurationManager.js";

export default class ControlManager {

    constructor() {

        this.configuration = new ConfigurationManager();

        this.selectedControl = null;

    }

    async load() {

        await this.configuration.load();

    }

    getControl(controlId) {

        return KronosControls.findById(controlId);

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

    hasCommand(controlId) {

        return this.configuration.has(controlId);

    }

    removeCommand(controlId) {

        this.configuration.remove(controlId);

    }

    getControls() {

        return KronosControls.all;

    }

    getButtons() {

        return KronosControls.getButtons();

    }

    getEncoders() {

        return KronosControls.getEncoders();

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

        return this.getControl(

            this.selectedControl

        );

    }

    resetSelection() {

        this.selectedControl = null;

    }

    async resetConfiguration() {

        await this.configuration.reset();

    }

}