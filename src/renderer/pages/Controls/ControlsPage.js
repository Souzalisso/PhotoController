import KronosLayout from "../../kronos/KronosLayout.js";
import KronosControls from "../../kronos/KronosControls.js";
import LightroomCommands from "../../data/Lightroom/LightroomCommands.js";

export default class ControlsPage {

    constructor() {

        this.kronosLayout = new KronosLayout();

        this.selectedControl = null;

    }

    renderCommands() {

        return LightroomCommands.map(command => `

            <option value="${command.id}">

                ${command.category} • ${command.name}

            </option>

        `).join("");

    }

    render() {

        return `

        <main class="content">

            <h1>Configuração do KRONOS</h1>

            <div class="controls-layout">

                <div class="layout-area">

                    ${this.kronosLayout.render()}

                </div>

                <aside class="properties">

                    <div class="card">

                        <h2>Controle</h2>

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

                            ${this.renderCommands()}

                        </select>

                    </div>

                </aside>

            </div>

        </main>

        `;

    }

    init() {

        this.kronosLayout.init();

        document.addEventListener("kronos:control-selected", this.onControlSelected.bind(this));

        document.getElementById("commandSelect").addEventListener(

            "change",

            this.onCommandSelected.bind(this)

        );

    }

    onControlSelected(event) {

        this.selectedControl = event.detail.id;

        const control = KronosControls.find(item => item.id === this.selectedControl);

        if (!control) {

            return;

        }

        document.getElementById("selectedControl").textContent = control.label;

    }

    async onCommandSelected(event) {

        if (!this.selectedControl) {

            alert("Selecione um controle.");

            event.target.value = "";

            return;

        }

        await window.photoController.saveControl(

            this.selectedControl,

            event.target.value

        );

        console.log(

            `${this.selectedControl} -> ${event.target.value}`

        );

    }

}