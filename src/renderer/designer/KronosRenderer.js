export default class KronosRenderer {

    constructor() {

        this.classPrefix = "kronos";

    }

    /**
     * Renderiza qualquer controle.
     */
    render(control) {

        switch (control.type) {

            case "button":
                return this.renderButton(control);

            case "encoder":
                return this.renderEncoder(control);

            case "display":
                return this.renderDisplay(control);

            default:
                throw new Error(`Tipo de controle desconhecido: ${control.type}`);

        }

    }

    /**
     * Renderiza um botão.
     */
    renderButton(control) {

        const button = document.createElement("button");

        button.className = `${this.classPrefix}-button`;

        button.dataset.id = control.id;
        button.dataset.command = control.command;
        button.dataset.type = control.type;

        button.textContent = control.label;

        return button;

    }

    /**
     * Renderiza um encoder.
     */
    renderEncoder(control) {

        const container = document.createElement("div");

        container.className = `${this.classPrefix}-encoder`;

        container.dataset.id = control.id;
        container.dataset.command = control.command;
        container.dataset.type = control.type;

        const ring = document.createElement("div");
        ring.className = "encoder-ring";

        const knob = document.createElement("div");
        knob.className = "encoder-knob";

        const label = document.createElement("span");
        label.className = "encoder-label";
        label.textContent = control.label;

        container.appendChild(ring);
        container.appendChild(knob);
        container.appendChild(label);

        return container;

    }

    /**
     * Renderiza o display OLED.
     */
    renderDisplay(control) {

        const display = document.createElement("div");

        display.className = `${this.classPrefix}-display`;

        display.dataset.id = control.id;
        display.dataset.type = control.type;

        const title = document.createElement("div");
        title.className = "display-title";
        title.textContent = "KRONOS";

        const line1 = document.createElement("div");
        line1.className = "display-line";
        line1.id = "oled-line-1";

        const line2 = document.createElement("div");
        line2.className = "display-line";
        line2.id = "oled-line-2";

        const line3 = document.createElement("div");
        line3.className = "display-line";
        line3.id = "oled-line-3";

        display.appendChild(title);
        display.appendChild(line1);
        display.appendChild(line2);
        display.appendChild(line3);

        return display;

    }

}