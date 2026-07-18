export default class KronosRenderer {

    render(control) {

        switch (control.type) {

            case "button":
                return this.renderButton(control);

            case "encoder":
                return this.renderEncoder(control);

            case "display":
                return this.renderDisplay(control);

            default:
                return "";

        }

    }

    renderButton(control) {

        return `

            <button
                class="kronos-control button"
                data-id="${control.id}"

                style="
                    left:${control.x}px;
                    top:${control.y}px;
                    width:${control.width}px;
                    height:${control.height}px;
                ">

                ${control.label}

            </button>

        `;

    }

    renderEncoder(control){

        return `

            <div
                class="kronos-control encoder"
                data-id="${control.id}"

                style="
                    left:${control.x}px;
                    top:${control.y}px;
                    width:${control.size}px;
                    height:${control.size}px;
                ">

                <div class="knob"></div>

                <span>${control.label}</span>

            </div>

        `;

    }

    renderDisplay(control){

        return `

            <div
                class="kronos-display"

                style="
                    left:${control.x}px;
                    top:${control.y}px;
                    width:${control.width}px;
                    height:${control.height}px;
                ">

                KRONOS

            </div>

        `;

    }

}