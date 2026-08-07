class Control {

    constructor(data = {}) {

        // ==========================
        // Identificação
        // ==========================

        this.id = data.id || "";

        this.label = data.label || "";

        this.type = data.type || "";

        this.hardware = data.hardware || null;


        // ==========================
        // Configuração
        // ==========================

        this.command = data.command || null;

        this.configurable = data.configurable ?? false;

        this.defaultValue = data.defaultValue ?? 0;

        this.position = data.position ?? 0;

        this.push = data.push ?? false;

        this.led = data.led ?? false;


        // ==========================
        // Estado
        // ==========================

        this.selected = false;

        this.enabled = true;

        this.connected = false;

        this.ledState = false;

        this.value = this.defaultValue;

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
    // Recursos
    // =====================================

    supportsLed() {

        return this.led !== false;

    }

    supportsPush() {

        return this.push === true;

    }


    // =====================================
    // Seleção
    // =====================================

    select() {

        this.selected = true;

    }

    unselect() {

        this.selected = false;

    }

    isSelected() {

        return this.selected;

    }


    // =====================================
    // Estado
    // =====================================

    enable() {

        this.enabled = true;

    }

    disable() {

        this.enabled = false;

    }

    isEnabled() {

        return this.enabled;

    }


    // =====================================
    // Conexão
    // =====================================

    connect() {

        this.connected = true;

    }

    disconnect() {

        this.connected = false;

    }

    isConnected() {

        return this.connected;

    }


    // =====================================
    // LED
    // =====================================

    turnLedOn() {

        if (!this.supportsLed()) return;

        this.ledState = true;

    }

    turnLedOff() {

        if (!this.supportsLed()) return;

        this.ledState = false;

    }

    toggleLed() {

        if (!this.supportsLed()) return;

        this.ledState = !this.ledState;

    }

    isLedOn() {

        return this.ledState;

    }


    // =====================================
    // Valor
    // =====================================

    setValue(value) {

        this.value = value;

    }

    getValue() {

        return this.value;

    }

    resetValue() {

        this.value = this.defaultValue;

    }


    // =====================================
    // Comando
    // =====================================

    setCommand(command) {

        this.command = command;

    }

    getCommand() {

        return this.command;

    }


    // =====================================
    // Reset
    // =====================================

    reset() {

        this.selected = false;

        this.enabled = true;

        this.connected = false;

        this.ledState = false;

        this.value = this.defaultValue;

    }


    // =====================================
    // Serialização
    // =====================================

    toJSON() {

        return {

            id: this.id,

            label: this.label,

            type: this.type,

            hardware: this.hardware,

            command: this.command,

            configurable: this.configurable,

            defaultValue: this.defaultValue,

            position: this.position,

            push: this.push,

            led: this.led

        };

    }

}

module.exports = Control;