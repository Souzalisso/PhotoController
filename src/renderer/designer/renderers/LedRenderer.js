class LedRenderer {

    render(control) {

        if (!control || !control.supportsLed()) {

            return "";

        }


        const classes = [

            "kronos-led"

        ];


        // ==========================
        // Estado
        // ==========================

        if (control.isLedOn()) {

            classes.push("on");

        }


        if (!control.isEnabled()) {

            classes.push("disabled");

        }


        // ==========================
        // Tipo de LED
        // ==========================

        if (typeof control.led === "string") {

            classes.push(
                `led-${control.led}`
            );

        }


        // ==========================
        // HTML
        // ==========================

        return `

            <span

                class="${classes.join(" ")}"

                data-led-control="${control.id}"

                aria-hidden="true">

            </span>

        `;

    }


    // =====================================
    // Atualizar LED
    // =====================================

    update(control) {

        if (!control || !control.supportsLed()) {

            return;

        }


        const element = document.querySelector(

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

}


module.exports = LedRenderer;