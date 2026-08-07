class EncoderRenderer {

    render(control) {

        if (!control || !control.isEncoder()) {

            return "";

        }

        const classes = [

            "kronos-control",
            "kronos-encoder"

        ];


        // ==========================
        // Estado
        // ==========================

        if (control.isSelected()) {

            classes.push("selected");

        }

        if (!control.isEnabled()) {

            classes.push("disabled");

        }


        if (control.supportsLed()) {

            classes.push("has-led");

        }


        // ==========================
        // LED
        // ==========================

        const ledClass = control.isLedOn()

            ? "on"

            : "";


        // ==========================
        // Push
        // ==========================

        const pushAttribute = control.supportsPush()

            ? 'data-push="true"'

            : 'data-push="false"';


        // ==========================
        // HTML
        // ==========================

        return `

            <div

                class="${classes.join(" ")}"

                data-id="${control.id}"

                data-type="${control.type}"

                data-configurable="${control.configurable}"

                data-position="${control.position}"

                ${pushAttribute}>

                <div class="encoder-ring">

                    ${
                        control.supportsLed()

                            ? `
                                <div
                                    class="encoder-led ${ledClass}">
                                </div>
                              `

                            : ""
                    }

                    <div class="encoder-cap">

                        <div class="encoder-marker">

                        </div>

                    </div>

                </div>


                <div class="encoder-label">

                    ${control.label}

                </div>

            </div>

        `;

    }

}


module.exports = EncoderRenderer;