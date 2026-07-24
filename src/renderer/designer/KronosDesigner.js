import KronosCanvas from "./KronosCanvas.js";
import ControlManager from "../../core/managers/ControlManager.js";
import LightroomCommands from "../../core/data/lightroom/LightroomCommands.js";

export default class KronosDesigner {

    constructor() {

    this.controlManager = new ControlManager();

    this.canvas = new KronosCanvas(

        this.controlManager

    );

    this.selectedControl = null;

}

    render() {

        return `

            <main class="designer-page">

                <section class="designer-workspace">

                    ${this.canvas.render()}

                </section>

                <aside class="designer-sidebar">

                    <div class="designer-card">

                        <h2>Controle Selecionado</h2>

                        <p id="selectedControl">

                            Nenhum controle selecionado

                        </p>

                    </div>

                    <div class="designer-card">

                        <h2>Comando Lightroom</h2>

                        <select id="commandSelect">

                            <option value="">

                                Selecione um comando

                            </option>

                            ${this.renderCommands()}

                        </select>

                    </div>

                    <div class="designer-card">

                        <button id="saveControl">

                            Salvar Configuração

                        </button>

                    </div>

                </aside>

            </main>

        `;

    }

    renderCommands() {

        return LightroomCommands.map(command => `

            <option value="${command.id}">

                ${command.category} • ${command.name}

            </option>

        `).join("");

    }

    async init() {

        await this.controlManager.load();

        this.registerControls();

        this.registerSaveButton();

    }

    registerControls() {

        document
            .querySelectorAll(".kronos-control")
            .forEach(control => {

                control.addEventListener("click", () => {

                    this.selectControl(control);

                });

            });

    }

    selectControl(controlElement) {

        document
            .querySelectorAll(".kronos-control")
            .forEach(control => {

                control.classList.remove("selected");

            });

        controlElement.classList.add("selected");

        this.selectedControl = controlElement.dataset.id;

        this.updateSidebar();

    }

    updateSidebar() {

    document.getElementById(
        "selectedControl"
    ).textContent = this.selectedControl;

    const command = this.controlManager.getCommand(
        this.selectedControl
    );

    document.getElementById(
        "commandSelect"
    ).value = command || "";

}

    showMessage(message) {

        console.log(

            "[KRONOS]",

         message

    );

}

    registerSaveButton() {

        document
            .getElementById("saveControl")
            .addEventListener("click", async () => {

                if (!this.selectedControl) {

                    this.showMessage(
                        "Selecione um controle."
                    );

                    return;

                }

                const command = document
                    .getElementById("commandSelect")
                    .value;

                await this.controlManager.setCommand(

                    this.selectedControl,

                    command

                );

                this.showMessage(
                "Configuração salva."
            );

            });

    }

}