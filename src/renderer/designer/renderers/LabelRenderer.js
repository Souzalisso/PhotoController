class LabelRenderer {

    // =====================================
    // Renderização
    // =====================================

    render(control) {

        if (!control) {

            return "";

        }


        const classes = [

            "kronos-label"

        ];


        // =================================
        // Estado
        // =================================

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


        const label =
            this.escapeHTML(
                control.label
            );


        // =================================
        // HTML
        // =================================

        return `

            <span

                class="${classes.join(" ")}"

                data-label-control="${id}">

                ${label}

            </span>

        `;

    }


    // =====================================
    // Atualização
    // =====================================

    update(control) {

        if (!control) {

            return;

        }


        const element =
            document.querySelector(

                `[data-label-control="${control.id}"]`

            );


        if (!element) {

            return;

        }


        element.textContent =
            control.label;


        element.classList.toggle(

            "selected",

            control.isSelected()

        );


        element.classList.toggle(

            "disabled",

            !control.isEnabled()

        );

    }


    // =====================================
    // Alterar texto
    // =====================================

    setText(control, text) {

        if (!control) {

            return;

        }


        control.label =
            String(text ?? "");


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


module.exports = LabelRenderer;