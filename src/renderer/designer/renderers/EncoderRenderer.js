class EncoderRenderer {

    render(control) {

        if (!control || !control.isEncoder()) {
            return "";
        }

        const classes = [
            "kronos-control",
            "kronos-encoder",
            "encoder"
        ];

        if (control.isSelected()) {
            classes.push("selected");
        }

        if (!control.isEnabled()) {
            classes.push("disabled");
        }

        if (
            typeof control.supportsPush === "function" &&
            control.supportsPush()
        ) {
            classes.push("pushable");
        }

        const id = this.escapeHTML(control.id);

        const label = this.escapeHTML(control.label);

        const position = this.escapeHTML(control.position);

        const supportsPush =
            typeof control.supportsPush === "function" &&
            control.supportsPush();

        return `
            <div
                class="${classes.join(" ")}"
                data-id="${id}"
                data-type="encoder"
                data-configurable="${control.configurable}"
                data-position="${position}"
                data-push="${supportsPush}">

                <div class="encoder-ring">

                    <div class="encoder-cap"></div>

                    <div class="encoder-marker"></div>

                    ${
                        control.led
                            ? `
                                <div
                                    class="encoder-led">
                                </div>
                              `
                            : ""
                    }

                </div>

                <span class="encoder-label">
                    ${label}
                </span>

            </div>
        `;
    }


    update(control) {

        if (!control || !control.isEncoder()) {
            return;
        }

        const element = document.querySelector(
            `[data-id="${control.id}"]`
        );

        if (!element) {
            return;
        }

        element.classList.toggle(
            "selected",
            control.isSelected()
        );

        element.classList.toggle(
            "disabled",
            !control.isEnabled()
        );

        const indicator =
            element.querySelector(".encoder-marker");

        if (!indicator) {
            return;
        }

        const value =
            Number(control.getValue()) || 0;

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

        indicator.style.transform =
            `rotate(${rotation}deg)`;
    }


    escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

}


module.exports = EncoderRenderer;