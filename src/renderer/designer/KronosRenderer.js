export default class KronosRenderer {

    render(control) {

        if (!control) {

            return "";

        }

        switch (control.type) {

            case "button":
                return this.renderButton(control);

            case "encoder":
                return this.renderEncoder(control);

            case "display":
                return this.renderDisplay(control);

            default:

                console.warn(

                    `Tipo de controle desconhecido: ${control.type}`

                );

                return "";

        }

    }

    renderButton(control) {

        return `

            <button

                class="${this.buildClass("button")}"

                ${this.buildDataset(control)}>

                <span class="button-led"></span>

                <span class="button-text">

                    ${control.label}

                </span>

            </button>

        `;

    }

    renderEncoder(control) {

        return `

            <div

                class="${this.buildClass("encoder")}"

                ${this.buildDataset(control)}>

                <div class="encoder-ring">

                    <div class="encoder-led"></div>

                    <div class="encoder-cap"></div>

                    <div class="encoder-marker"></div>

                </div>

                <div class="encoder-label">

                    ${control.label}

                </div>

            </div>

        `;

    }

    renderDisplay(control) {

        return `

            <div

                class="${this.buildClass("display")}"

                ${this.buildDataset(control)}>

                <div class="oled-header">

                    KRONOS

                </div>

                <div class="oled-body">

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

    buildClass(type) {

        return [

            "kronos-control",

            `kronos-${type}`

        ].join(" ");

    }

    buildDataset(control) {

        return `

            data-id="${control.id}"

            data-type="${control.type}"

            data-command="${control.command ?? ""}"

            data-configurable="${control.configurable}"

            data-position="${control.position}"

        `;

    }

}