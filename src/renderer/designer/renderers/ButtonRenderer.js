class ButtonRenderer {

    // =====================================
    // Renderização
    // =====================================

    render(control) {

        if (!control || !control.isButton()) {

            return "";

        }


        // =================================
        // Classes
        // =================================

        const classes = [

            "kronos-control",
            "kronos-button"

        ];


        if (control.isSelected()) {

            classes.push("selected");

        }


        if (!control.isEnabled()) {

            classes.push("disabled");

        }


        if (control.supportsLed()) {

            classes.push("has-led");

        }


        if (control.hasCommand()) {

            classes.push("configured");

        }


        // =================================
        // Identificação
        // =================================

        const id =
            this.escapeHTML(
                control.id
            );


        const label =
            this.escapeHTML(
                control.label
            );


        const position =
            this.escapeHTML(
                control.position
            );


        // =================================
        // LED
        // =================================

        const led =
            control.supportsLed()

                ? `

                    <span
                        class="button-led ${
                            control.isLedOn()
                                ? "on"
                                : ""
                        }">
                    </span>

                  `

                : "";


        // =================================
        // Renderização
        // =================================

        return `

            <button

                type="button"

                class="${classes.join(" ")}"

                data-id="${id}"

                data-type="button"

                data-configurable="${
                    control.configurable
                }"

                data-position="${position}"

                ${
                    control.isEnabled()
                        ? ""
                        : "disabled"
                }>

                ${led}

                <span class="button-text">

                    ${label}

                </span>

            </button>

        `;

    }


    // =====================================
    // Atualização
    // =====================================

    update(control) {

        if (!control || !control.isButton()) {

            return;

        }


        const element =
            document.querySelector(
                `[data-id="${control.id}"]`
            );


        if (!element) {

            return;

        }


        // =================================
        // Seleção
        // =================================

        element.classList.toggle(

            "selected",

            control.isSelected()

        );


        // =================================
        // Estado
        // =================================

        element.classList.toggle(

            "disabled",

            !control.isEnabled()

        );


        // =================================
        // Configuração
        // =================================

        element.classList.toggle(

            "configured",

            control.hasCommand()

        );


        // =================================
        // LED
        // =================================

        const led =
            element.querySelector(
                ".button-led"
            );


        if (led) {

            led.classList.toggle(

                "on",

                control.isLedOn()

            );

        }

    }


    // =====================================
    // Escape HTML
    // =====================================

    escapeHTML(value) {

        return String(
            value ?? ""
        )

            .replace(
                /&/g,
                "&amp;"
            )

            .replace(
                /</g,
                "&lt;"
            )

            .replace(
                />/g,
                "&gt;"
            )

            .replace(
                /"/g,
                "&quot;"
            )

            .replace(
                /'/g,
                "&#039;"
            );

    }

}


module.exports = ButtonRenderer;