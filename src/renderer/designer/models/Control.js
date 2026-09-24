class Control {

    constructor(definition = {}) {

        this.id =
            definition.id ||
            null;

        this.label =
            definition.label ||
            this.id ||
            "";

        this.type =
            definition.type ||
            "unknown";

        this.hardware =
            definition.hardware ||
            null;

        this.position =
            definition.position ??
            null;

        this.section =
            definition.section ||
            null;

        this.configurable =
            Boolean(
                definition.configurable
            );

        this.push =
            Boolean(
                definition.push
            );

        this.led =
            definition.led ||
            null;

        this.enabled =
            definition.enabled !== false;

        this.selected =
            false;

        this.command =
            definition.command ||
            null;

        this.clockwiseCommand =
            definition.clockwiseCommand ||
            null;

        this.counterClockwiseCommand =
            definition.counterClockwiseCommand ||
            null;

        this.pushCommand =
            definition.pushCommand ||
            null;

        this.value =
            definition.value ??
            0;

        this.defaultValue =
            definition.value ??
            0;

        this.ledOn =
            false;

        this.metadata =
            definition.metadata ||
            {};
    }

    isButton() {
        return this.type === "button";
    }

    isEncoder() {
        return this.type === "encoder";
    }

    isDisplay() {
        return this.type === "display";
    }

    supportsPush() {
        return (
            this.isEncoder() &&
            this.push === true
        );
    }

    isEnabled() {
        return this.enabled;
    }

    enable() {
        this.enabled = true;
        return this;
    }

    disable() {
        this.enabled = false;
        return this;
    }

    isSelected() {
        return this.selected;
    }

    select() {
        this.selected = true;
        return this;
    }

    unselect() {
        this.selected = false;
        return this;
    }

    setCommand(command) {

        if (!this.configurable) {
            throw new Error(
                `Controle não configurável: ${this.id}`
            );
        }

        if (
            command === null ||
            command === undefined ||
            command === ""
        ) {
            this.command = null;
            return this;
        }

        this.command =
            String(command);

        return this;
    }

    getCommand() {
        return this.command;
    }

    hasCommand() {
        return Boolean(
            this.command
        );
    }

    setClockwiseCommand(command) {

        if (!this.configurable) {
            throw new Error(
                `Controle não configurável: ${this.id}`
            );
        }

        if (
            command === null ||
            command === undefined ||
            command === ""
        ) {
            this.clockwiseCommand = null;
            return this;
        }

        this.clockwiseCommand =
            String(command);

        return this;
    }

    getClockwiseCommand() {
        return this.clockwiseCommand;
    }

    hasClockwiseCommand() {
        return Boolean(
            this.clockwiseCommand
        );
    }

    setCounterClockwiseCommand(command) {

        if (!this.configurable) {
            throw new Error(
                `Controle não configurável: ${this.id}`
            );
        }

        if (
            command === null ||
            command === undefined ||
            command === ""
        ) {
            this.counterClockwiseCommand = null;
            return this;
        }

        this.counterClockwiseCommand =
            String(command);

        return this;
    }

    getCounterClockwiseCommand() {
        return this.counterClockwiseCommand;
    }

    hasCounterClockwiseCommand() {
        return Boolean(
            this.counterClockwiseCommand
        );
    }

    setPushCommand(command) {

        if (!this.configurable) {
            throw new Error(
                `Controle não configurável: ${this.id}`
            );
        }

        if (
            command === null ||
            command === undefined ||
            command === ""
        ) {
            this.pushCommand = null;
            return this;
        }

        this.pushCommand =
            String(command);

        return this;
    }

    getPushCommand() {
        return this.pushCommand;
    }

    hasPushCommand() {
        return Boolean(
            this.pushCommand
        );
    }

    setValue(value) {
        this.value = value;
        return this;
    }

    getValue() {
        return this.value;
    }

    supportsLed() {
        return Boolean(this.led);
    }

    isLedOn() {
        return this.ledOn;
    }

    turnLedOn() {

        if (!this.supportsLed()) {
            return this;
        }

        this.ledOn = true;

        return this;
    }

    turnLedOff() {

        this.ledOn = false;

        return this;
    }

    toggleLed() {

        if (!this.supportsLed()) {
            return this;
        }

        this.ledOn =
            !this.ledOn;

        return this;
    }

    reset() {

        this.selected = false;

        this.value =
            this.defaultValue;

        this.ledOn = false;

        return this;
    }

    toJSON() {

        return {

            id: this.id,

            label: this.label,

            type: this.type,

            hardware: this.hardware,

            position: this.position,

            section: this.section,

            configurable:
                this.configurable,

            push:
                this.push,

            enabled:
                this.enabled,

            selected:
                this.selected,

            command:
                this.command,

            clockwiseCommand:
                this.clockwiseCommand,

            counterClockwiseCommand:
                this.counterClockwiseCommand,

            pushCommand:
                this.pushCommand,

            value:
                this.value,

            led:
                this.led,

            ledOn:
                this.ledOn,

            metadata:
                {
                    ...this.metadata
                }
        };
    }
}

module.exports = Control;