const KronosControls =
    require("../../renderer/designer/KronosControls");

const ConfigurationManager =
    require("./ConfigurationManager");


class ControlManager {

    constructor() {

        this.configuration =
            new ConfigurationManager();

        this.selectedControl = null;
    }


    // =====================================
    // Configuração
    // =====================================

    async load() {

        await this.configuration.load();
    }


    // =====================================
    // Controles
    // =====================================

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


    // =====================================
    // Comandos
    // =====================================

    getCommand(controlId) {

        return this.configuration.get(
            controlId
        );
    }


    getCommandForControl(controlId) {

        if (!controlId) {
            return null;
        }

        return this.configuration.get(
            controlId
        );
    }


    async setCommand(
        controlId,
        commandId
    ) {

        this.configuration.set(
            controlId,
            commandId
        );

        await this.configuration.save();
    }


    async removeCommand(controlId) {

        this.configuration.remove(
            controlId
        );

        await this.configuration.save();
    }


    hasCommand(controlId) {

        return this.configuration.has(
            controlId
        );
    }


    async resetConfiguration() {

        await this.configuration.reset();
    }


    // =====================================
    // Seleção
    // =====================================

    select(controlId) {

        this.selectedControl =
            controlId;
    }


    clearSelection() {

        this.selectedControl =
            null;
    }


    getSelected() {

        return this.selectedControl;
    }


    isSelected(controlId) {

        return (
            this.selectedControl ===
            controlId
        );
    }


    getSelectedControl() {

        if (!this.selectedControl) {
            return null;
        }

        return this.getControl(
            this.selectedControl
        );
    }
}


module.exports = ControlManager;