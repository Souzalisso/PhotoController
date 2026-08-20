class Control {

    constructor(definition = {}) {

        // =====================================
        // Identificação
        // =====================================

        this.id =
            definition.id || null;

        this.label =
            definition.label || this.id || "";

        this.type =
            definition.type || "unknown";


        // =====================================
        // Hardware
        // =====================================

        this.hardware =
            definition.hardware || null;


        // =====================================
        // Layout
        // =====================================

        this.position =
            definition.position ?? null;

        this.section =
            definition.section || null;


        // =====================================
        // Configuração
        // =====================================

        this.configurable =
            Boolean(
                definition.configurable
            );


        // =====================================
        // Capacidades
        // =====================================

        this.push =
            Boolean(
                definition.push
            );

        this.led =
            definition.led || null;


        // =====================================
        // Estado
        // =====================================

        this.enabled =
            definition.enabled !== false;

        this.selected =
            false;


        // =====================================
        // Comando
        // =====================================

        this.command =
            definition.command || null;


        // =====================================
        // Valor
        // =====================================

        this.value =
            definition.value ?? 0;

        this.defaultValue =
            definition.value ?? 0;


        // =====================================
        // Estado do LED
        // =====================================

        this.ledOn =
            false;


        // =====================================
        // Metadados
        // =====================================

        this.metadata =
            definition.metadata || {};

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
    // Push do Encoder
    // =====================================

    supportsPush() {

        return this.isEncoder() &&
            this.push === true;

    }


    // =====================================
    // Estado
    // =====================================

    isEnabled() {

        return this.enabled;

    }


    enable() {

        this.enabled =
            true;

        return this;

    }


    disable() {

        this.enabled =
            false;

        return this;

    }


    // =====================================
    // Seleção
    // =====================================

    isSelected() {

        return this.selected;

    }


    select() {

        this.selected =
            true;

        return this;

    }


    unselect() {

        this.selected =
            false;

        return this;

    }


    // =====================================
    // Configuração
    // =====================================

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

            this.command =
                null;

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


    // =====================================
    // Valor
    // =====================================

    setValue(value) {

        this.value =
            value;

        return this;

    }


    getValue() {

        return this.value;

    }


    // =====================================
    // LED
    // =====================================

    supportsLed() {

        return Boolean(
            this.led
        );

    }


    isLedOn() {

        return this.ledOn;

    }


    turnLedOn() {

        if (!this.supportsLed()) {

            return this;

        }


        this.ledOn =
            true;

        return this;

    }


    turnLedOff() {

        this.ledOn =
            false;

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


    // =====================================
    // Reset
    // =====================================

    reset() {

        this.selected =
            false;

        this.value =
            this.defaultValue;

        this.ledOn =
            false;


        return this;

    }


    // =====================================
    // Serialização
    // =====================================

    toJSON() {

        return {

            id:
                this.id,

            label:
                this.label,

            type:
                this.type,

            hardware:
                this.hardware,

            position:
                this.position,

            section:
                this.section,

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