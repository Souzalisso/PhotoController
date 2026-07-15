import KronosHardware from "../../data/KronosHardware.js";

export default class ControlsPage {

    renderButtons() {

        return KronosHardware.controls.buttons.map(button => {

            return `

                <button
                    class="control-button"
                    data-id="${button.id}">

                    ${button.label}

                </button>

            `;

        }).join("");

    }

    render() {

        return `

        <main class="content">

            <h1>Controles</h1>

            <div class="card">

                <h2>Botões</h2>

                <div class="buttons-grid">

                    ${this.renderButtons()}

                </div>

            </div>

            <div class="card">

                <h2>Controle selecionado</h2>

                <p id="selectedControl">

                    Nenhum

                </p>

            </div>

        </main>

        `;

    }

    init() {

        document.querySelectorAll(".control-button").forEach(button => {

            button.addEventListener("click", () => {

                document.getElementById("selectedControl").textContent =
                    button.textContent.trim();

            });

        });

    }

}