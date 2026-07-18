import KronosControls from "./KronosControls.js";
import KronosRenderer from "./KronosRenderer.js";

export default class KronosLayout {

    constructor() {

        this.renderer = new KronosRenderer();

    }

    render() {

        return `

            <div class="kronos-layout">

                ${KronosControls
                    .map(control => this.renderer.render(control))
                    .join("")}

            </div>

        `;

    }

    init() {

        document.querySelectorAll(".kronos-control").forEach(control => {

            control.addEventListener("click", () => {

                document.querySelectorAll(".kronos-control").forEach(item => {

                    item.classList.remove("selected");

                });

                control.classList.add("selected");

                document.dispatchEvent(

                    new CustomEvent("kronos:control-selected", {

                        detail: {

                            id: control.dataset.id

                        }

                    })

                );

            });

        });

    }

}