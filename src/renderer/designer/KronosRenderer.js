const ButtonRenderer = require("./renderers/ButtonRenderer");
const EncoderRenderer = require("./renderers/EncoderRenderer");
const DisplayRenderer = require("./renderers/DisplayRenderer");
const LedRenderer = require("./renderers/LedRenderer");
const LabelRenderer = require("./renderers/LabelRenderer");


class KronosRenderer {

    constructor() {

        this.buttonRenderer = new ButtonRenderer();

        this.encoderRenderer = new EncoderRenderer();

        this.displayRenderer = new DisplayRenderer();

        this.ledRenderer = new LedRenderer();

        this.labelRenderer = new LabelRenderer();

    }


    // =====================================
    // Renderer principal
    // =====================================

    render(control) {

        if (!control) {

            return "";

        }


        switch (control.type) {

            case "button":

                return this.renderButton(control);


            case "encoder":

                return this.renderEncoder(control);


            case "display":

                return this.renderDisplay(control);


            default:

                console.warn(

                    `[KRONOS] Tipo de controle desconhecido: ${control.type}`

                );

                return "";

        }

    }


    // =====================================
    // Button
    // =====================================

    renderButton(control) {

        return this.buttonRenderer.render(

            control

        );

    }


    // =====================================
    // Encoder
    // =====================================

    renderEncoder(control) {

        return this.encoderRenderer.render(

            control

        );

    }


    // =====================================
    // Display
    // =====================================

    renderDisplay(control) {

        return this.displayRenderer.render(

            control

        );

    }


    // =====================================
    // LED
    // =====================================

    renderLed(control) {

        return this.ledRenderer.render(

            control

        );

    }


    // =====================================
    // Label
    // =====================================

    renderLabel(control) {

        return this.labelRenderer.render(

            control

        );

    }


    // =====================================
    // Atualizar LED
    // =====================================

    updateLed(control) {

        this.ledRenderer.update(

            control

        );

    }


    // =====================================
    // Atualizar Display
    // =====================================

    updateDisplay(control, data = {}) {

        this.displayRenderer.update(

            control,

            data

        );

    }


    // =====================================
    // Limpar Display
    // =====================================

    clearDisplay() {

        this.displayRenderer.clear();

    }

}


module.exports = KronosRenderer;