class DisplayRenderer {

    // =====================================
    // Renderização
    // =====================================

    render(control) {

        if (!control || !control.isDisplay()) {

            return "";

        }


        // =================================
        // Classes
        // =================================

        const classes = [

            "kronos-control",
            "kronos-display"

        ];


        if (control.isSelected()) {

            classes.push("selected");

        }


        if (!control.isEnabled()) {

            classes.push("disabled");

        }


        // =================================
        // Identificação
        // =================================

        const id =
            this.escapeHTML(
                control.id
            );


        // =================================
        // HTML
        // =================================

        return `

            <div

                class="${classes.join(" ")}"

                data-id="${id}"

                data-type="display"

                data-configurable="${
                    control.configurable
                }">

                <div class="oled-header">

                    <span class="oled-brand">

                        KRONOS

                    </span>

                </div>


                <div class="oled-screen">

                    <div
                        class="oled-line oled-line-1">

                        Lightroom

                    </div>


                    <div
                        class="oled-line oled-line-2">

                        Ready

                    </div>


                    <div
                        class="oled-line oled-line-3">
                    </div>

                </div>

            </div>

        `;

    }


    // =====================================
    // Atualização
    // =====================================

    update(
        control,
        {
            title = "",
            value = "",
            status = ""
        } = {}
    ) {

        if (!control || !control.isDisplay()) {

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
        // Estado
        // =================================

        element.classList.toggle(

            "selected",

            control.isSelected()

        );


        element.classList.toggle(

            "disabled",

            !control.isEnabled()

        );


        // =================================
        // Linhas
        // =================================

        const titleElement =
            element.querySelector(
                ".oled-line-1"
            );


        const valueElement =
            element.querySelector(
                ".oled-line-2"
            );


        const statusElement =
            element.querySelector(
                ".oled-line-3"
            );


        if (titleElement) {

            titleElement.textContent =
                title;

        }


        if (valueElement) {

            valueElement.textContent =
                value;

        }


        if (statusElement) {

            statusElement.textContent =
                status;

        }

    }


    // =====================================
    // Limpar
    // =====================================

    clear(control = null) {

        let element;


        if (control) {

            element =
                document.querySelector(
                    `[data-id="${control.id}"]`
                );

        }
        else {

            element =
                document.querySelector(
                    ".kronos-display"
                );

        }


        if (!element) {

            return;

        }


        const lines =
            element.querySelectorAll(
                ".oled-line"
            );


        lines.forEach(
            (line, index) => {

                line.textContent = "";

            }
        );

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


module.exports = DisplayRenderer;