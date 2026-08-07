class Control {

    constructor(definition = {}) {

        this.id = definition.id || null;

        this.label = definition.label || "";

        this.type = definition.type || null;

        this.configurable =
            definition.configurable === true;

        this.position =
            definition.position ?? null;

        this.hardware =
            definition.hardware || null;

        this.push =
            definition.push === true;

        this.led =
            definition.led ?? false;

        this.defaultValue =
            definition.defaultValue ?? 0;

        this.value =
            this.defaultValue;

        this.command =
            definition.command || null;

        this.selected = false;

        this.enabled = true;

        this.ledOn = false;

    }


    // =====================================
    // Identificação
    // =====================================

    getId() {

        return this.id;

    }


    getLabel() {

        return this.label;

    }


    getType() {

        return this.type;

    }


    // =====================================
    // Tipo
    // =====================================

    isButton() {

        return this.type === "button";

    }


    isEncoder() {

        return this.type === "encoder";

    }


    isDisplay() {

        return this.type === "display";

    }


    // =====================================
    // Estado
    // =====================================

    isSelected() {

        return this.selected === true;

    }


    select() {

        this.selected = true;

        return this;

    }


    unselect() {

        this.selected = false;

        return this;

    }


    isEnabled() {

        return this.enabled === true;

    }


    enable() {

        this.enabled = true;

        return this;

    }


    disable() {

        this.enabled = false;

        return this;

    }


    // =====================================
    // LED
    // =====================================

    supportsLed() {

        return (

            this.led === true ||

            typeof this.led === "string"

        );

    }


    isLedOn() {

        return this.ledOn === true;

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

        this.ledOn = !this.ledOn;

        return this;

    }


    // =====================================
    // Encoder
    // =====================================

    supportsPush() {

        return this.push === true;

    }


    // =====================================
    // Comando Lightroom
    // =====================================

    getCommand() {

        return this.command;

    }


    setCommand(command) {

        if (!this.configurable) {

            throw new Error(

                `Controle não configurável: ${this.id}`

            );

        }


        this.command =
            command || null;


        return this;

    }


    clearCommand() {

        this.command = null;

        return this;

    }


    // =====================================
    // Valor
    // =====================================

    getValue() {

        return this.value;

    }


    setValue(value) {

        this.value = value;

        return this;

    }


    resetValue() {

        this.value =
            this.defaultValue;

        return this;

    }


    // =====================================
    // Reset
    // =====================================

    reset() {

        this.selected = false;

        this.enabled = true;

        this.ledOn = false;

        this.command = null;

        this.value =
            this.defaultValue;

        return this;

    }


    // =====================================
    // Serialização
    // =====================================

    toJSON() {

        return {

            id: this.id,

            label: this.label,

            type: this.type,

            configurable: this.configurable,

            position: this.position,

            hardware: this.hardware,

            push: this.push,

            led: this.led,

            defaultValue: this.defaultValue,

            value: this.value,

            command: this.command,

            selected: this.selected,

            enabled: this.enabled,

            ledOn: this.ledOn

        };

    }

}


module.exports = Control;