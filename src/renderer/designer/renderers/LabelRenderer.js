class LabelRenderer {

    render(control) {

        if (!control) {

            return "";

        }


        const classes = [

            "kronos-label"

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

            <span

                class="${classes.join(" ")}"

                data-label-control="${control.id}">

                ${control.label}

            </span>

        `;

    }


    update(control) {

        if (!control) {

            return;

        }


        const element = document.querySelector(

            `[data-label-control="${control.id}"]`

        );


        if (!element) {

            return;

        }


        element.textContent = control.label;


        element.classList.toggle(

            "selected",

            control.isSelected()

        );


        element.classList.toggle(

            "disabled",

            !control.isEnabled()

        );

    }


    setText(control, text) {

        if (!control) {

            return;

        }


        control.label = text;

        this.update(control);

    }

}


module.exports = LabelRenderer;