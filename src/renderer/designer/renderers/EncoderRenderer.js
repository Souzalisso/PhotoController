class EncoderRenderer {

    render(control) {

        if (!control || !control.isEncoder()) {

            return "";

        }


        // =====================================
        // Classes
        // =====================================

        const classes = [

            "kronos-control",
            "encoder"

        ];


        if (control.isSelected()) {

            classes.push("selected");

        }


        if (!control.isEnabled()) {

            classes.push("disabled");

        }


        if (control.supportsPush()) {

            classes.push("pushable");

        }


        // =====================================
        // Identificação
        // =====================================

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


        // =====================================
        // LED
        // =====================================

        const hasLed =
            control.supportsLed();


        const ledClass =
            control.isLedOn()
                ? "active"
                : "";


        // =====================================
        // Renderização
        // =====================================

        return `

            <div

                class="${classes.join(" ")}"

                data-id="${id}"

                data-type="encoder"

                data-configurable="${control.configurable}"

                data-position="${position}"

                data-push="${control.supportsPush()}">

                <div class="encoder-ring">

                    ${
                        hasLed

                            ? `

                                <div
                                    class="encoder-led ${ledClass}">
                                </div>

                              `

                            : ""

                    }


                    <div class="encoder-cap">

                        <div
                            class="encoder-marker">
                        </div>

                    </div>

                </div>


                <span class="encoder-label">

                    ${label}

                </span>

            </div>

        `;

    }


    // =====================================
    // Atualização
    // =====================================

    update(control) {

        if (!control || !control.isEncoder()) {

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
        // LED
        // =================================

        const led =
            element.querySelector(
                ".encoder-led"
            );


        if (led) {

            led.classList.toggle(

                "active",

                control.isLedOn()

            );

        }


        // =================================
        // Rotação
        // =================================

        const cap =
            element.querySelector(
                ".encoder-cap"
            );


        if (!cap) {

            return;

        }


        const value =
            Number(
                control.getValue()
            ) || 0;


        const normalized =
            Math.max(

                -1,

                Math.min(

                    1,

                    value

                )

            );


        const rotation =
            normalized * 135;


        cap.style.transform =
            `rotate(${rotation}deg)`;

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


module.exports = EncoderRenderer;