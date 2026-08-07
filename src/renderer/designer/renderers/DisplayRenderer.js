class DisplayRenderer {

    render(control) {

        if (!control || !control.isDisplay()) {

            return "";

        }

        const classes = [

            "kronos-control",
            "kronos-display"

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


        // ==========================
        // HTML
        // ==========================

        return `

            <div

                class="${classes.join(" ")}"

                data-id="${control.id}"

                data-type="${control.type}"

                data-configurable="${control.configurable}">

                <div class="oled-header">

                    <span class="oled-brand">

                        KRONOS

                    </span>

                </div>


                <div class="oled-screen">

                    <div
                        class="oled-line"
                        id="oled-line-1">

                        Lightroom

                    </div>


                    <div
                        class="oled-line"
                        id="oled-line-2">

                        Ready

                    </div>


                    <div
                        class="oled-line"
                        id="oled-line-3">

                    </div>

                </div>

            </div>

        `;

    }


    update(control, {

        title = "",
        value = "",
        status = ""

    } = {}) {

        if (!control || !control.isDisplay()) {

            return;

        }


        const titleElement = document.querySelector(
            "#oled-line-1"
        );

        const valueElement = document.querySelector(
            "#oled-line-2"
        );

        const statusElement = document.querySelector(
            "#oled-line-3"
        );


        if (titleElement) {

            titleElement.textContent = title;

        }


        if (valueElement) {

            valueElement.textContent = value;

        }


        if (statusElement) {

            statusElement.textContent = status;

        }

    }


    clear() {

        const titleElement = document.querySelector(
            "#oled-line-1"
        );

        const valueElement = document.querySelector(
            "#oled-line-2"
        );

        const statusElement = document.querySelector(
            "#oled-line-3"
        );


        if (titleElement) {

            titleElement.textContent = "";

        }


        if (valueElement) {

            valueElement.textContent = "";

        }


        if (statusElement) {

            statusElement.textContent = "";

        }

    }

}


module.exports = DisplayRenderer;