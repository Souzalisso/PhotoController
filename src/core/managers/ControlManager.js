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

        const command =
            this.configuration.get(controlId);


        if (
            command &&
            typeof command === "object"
        ) {

            return null;
        }


        return command;
    }


    getCommandForControl(controlId) {

        if (!controlId) {

            return null;
        }


        return this.getCommand(controlId);
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

        const command =
            this.getCommand(controlId);


        return Boolean(command);
    }


    // =====================================
    // Encoder - horário
    // =====================================

    getClockwiseCommand(controlId) {

        if (!controlId) {

            return null;
        }


        return this.configuration
            .getClockwiseCommand(controlId);
    }


    async setClockwiseCommand(
        controlId,
        commandId
    ) {

        this.configuration
            .setClockwiseCommand(
                controlId,
                commandId
            );


        await this.configuration.save();
    }


    // =====================================
    // Encoder - anti-horário
    // =====================================

    getCounterClockwiseCommand(controlId) {

        if (!controlId) {

            return null;
        }


        return this.configuration
            .getCounterClockwiseCommand(
                controlId
            );
    }


    async setCounterClockwiseCommand(
        controlId,
        commandId
    ) {

        this.configuration
            .setCounterClockwiseCommand(
                controlId,
                commandId
            );


        await this.configuration.save();
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


    // =====================================
    // Configuração geral
    // =====================================

    async resetConfiguration() {

        await this.configuration.reset();
    }
}


module.exports = ControlManager;