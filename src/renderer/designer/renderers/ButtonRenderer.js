class ButtonRenderer {

    render(control) {

        if (!control || !control.isButton()) {

            return "";

        }

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

        return `

            <button

                class="${classes.join(" ")}"

                data-id="${control.id}"

                data-type="${control.type}"

                data-configurable="${control.configurable}"

                data-position="${control.position}"

                ${control.isEnabled() ? "" : "disabled"}>

                ${
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

                        : ""
                }

                <span class="button-text">

                    ${control.label}

                </span>

            </button>

        `;

    }

}


module.exports = ButtonRenderer;