class LedRenderer {

    // =====================================
    // Renderização
    // =====================================

    render(control) {

        if (!control || !control.supportsLed()) {

            return "";

        }


        // =================================
        // Classes
        // =================================

        const classes = [

            "kronos-led"

        ];


        if (control.isLedOn()) {

            classes.push("on");

        }


        if (!control.isEnabled()) {

            classes.push("disabled");

        }


        // =================================
        // Tipo do LED
        // =================================

        if (typeof control.led === "string") {

            classes.push(

                `led-${this.escapeHTML(control.led)}`

            );

        }


        // =================================
        // HTML
        // =================================

        return `

            <span

                class="${classes.join(" ")}"

                data-led-control="${this.escapeHTML(
                    control.id
                )}"

                aria-hidden="true">

            </span>

        `;

    }


    // =====================================
    // Atualizar
    // =====================================

    update(control) {

        if (!control || !control.supportsLed()) {

            return;

        }


        const element =
            document.querySelector(

                `[data-led-control="${control.id}"]`

            );


        if (!element) {

            return;

        }


        element.classList.toggle(

            "on",

            control.isLedOn()

        );


        element.classList.toggle(

            "disabled",

            !control.isEnabled()

        );

    }


    // =====================================
    // Ligar
    // =====================================

    turnOn(control) {

        if (!control || !control.supportsLed()) {

            return;

        }


        control.turnLedOn();

        this.update(control);

    }


    // =====================================
    // Desligar
    // =====================================

    turnOff(control) {

        if (!control || !control.supportsLed()) {

            return;

        }


        control.turnLedOff();

        this.update(control);

    }


    // =====================================
    // Alternar
    // =====================================

    toggle(control) {

        if (!control || !control.supportsLed()) {

            return;

        }


        control.toggleLed();

        this.update(control);

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


module.exports = LedRenderer;