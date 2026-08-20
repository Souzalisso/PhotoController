const ButtonRenderer =
    require("./renderers/ButtonRenderer");

const EncoderRenderer =
    require("./renderers/EncoderRenderer");

const DisplayRenderer =
    require("./renderers/DisplayRenderer");

const LedRenderer =
    require("./renderers/LedRenderer");

const LabelRenderer =
    require("./renderers/LabelRenderer");


class KronosRenderer {

    constructor() {

        // =====================================
        // Renderers
        // =====================================

        this.buttonRenderer =
            new ButtonRenderer();

        this.encoderRenderer =
            new EncoderRenderer();

        this.displayRenderer =
            new DisplayRenderer();

        this.ledRenderer =
            new LedRenderer();

        this.labelRenderer =
            new LabelRenderer();

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

                return this.renderButton(
                    control
                );


            case "encoder":

                return this.renderEncoder(
                    control
                );


            case "display":

                return this.renderDisplay(
                    control
                );


            case "led":

                return this.renderLed(
                    control
                );


            case "label":

                return this.renderLabel(
                    control
                );


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

        if (!control) {

            return;

        }


        if (
            !this.ledRenderer ||
            typeof this.ledRenderer.update !== "function"
        ) {

            return;

        }


        this.ledRenderer.update(
            control
        );

    }


    // =====================================
    // Atualizar Display
    // =====================================

    updateDisplay(
        control,
        data = {}
    ) {

        if (!control) {

            return;

        }


        if (
            !this.displayRenderer ||
            typeof this.displayRenderer.update !== "function"
        ) {

            return;

        }


        this.displayRenderer.update(
            control,
            data
        );

    }


    // =====================================
    // Limpar Display
    // =====================================

    clearDisplay() {

        if (
            !this.displayRenderer ||
            typeof this.displayRenderer.clear !== "function"
        ) {

            return;

        }


        this.displayRenderer.clear();

    }

}


module.exports = KronosRenderer;