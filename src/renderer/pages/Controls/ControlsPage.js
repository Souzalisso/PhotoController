import KronosHardware from "../../data/KronosHardware.js";
import LightroomCommands from "../../data/Lightroom/LightroomCommands.js";

export default class ControlsPage {

    renderButtons() {

        return KronosHardware.controls.buttons.map(button => `

            <button
                class="control-button"
                data-id="${button.id}">

                ${button.label}

            </button>

        `).join("");

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

                <h2>Controle Selecionado</h2>

                <p id="selectedControl">
                    Nenhum
                </p>

            </div>

            <div class="card">

                <h2>Comando Lightroom</h2>

                <select id="commandSelect">

                    <option value="">
                        Selecione um comando...
                    </option>

                    ${LightroomCommands.map(command => `

                        <option value="${command.id}">

                            ${command.category} • ${command.name}

                        </option>

                    `).join("")}

                </select>

            </div>

        </main>

        `;

    }

    init() {

        let selectedButton = null;

        document.querySelectorAll(".control-button").forEach(button => {

            button.addEventListener("click", () => {

                document.querySelectorAll(".control-button").forEach(btn => {

                    btn.classList.remove("selected");

                });

                button.classList.add("selected");

                selectedButton = Number(button.dataset.id);

                document.getElementById("selectedControl").textContent =
                    button.textContent.trim();

            });

        });

       document.getElementById("commandSelect").addEventListener("change", async (event) => {

    if (!selectedButton) {

        alert("Selecione um botão primeiro.");

        event.target.value = "";

        return;

    }

    await window.photoController.saveButton(

        selectedButton,

        event.target.value

    );

    console.log(

        `BTN ${selectedButton} configurado para ${event.target.value}`

    );

});

    }

}