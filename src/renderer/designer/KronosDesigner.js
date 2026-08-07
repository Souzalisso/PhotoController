const KronosCanvas = require("./KronosCanvas");
const ControlRepository = require("./repositories/ControlRepository");

const LightroomCommands =
    require("../../core/data/lightroom/LightroomCommands");


class KronosDesigner {

    constructor() {

        // ==========================
        // Banco de controles
        // ==========================

        this.controlRepository =
            new ControlRepository();


        // ==========================
        // Canvas do hardware
        // ==========================

        this.canvas =
            new KronosCanvas(
                this.controlRepository
            );


        // ==========================
        // Estado
        // ==========================

        this.initialized = false;

    }


    // =====================================
    // Renderização
    // =====================================

    render() {

        return `

            <main class="designer-page">

                <section class="designer-workspace">

                    ${this.canvas.render()}

                </section>


                <aside class="designer-sidebar">

                    ${this.renderSelectedControl()}

                    ${this.renderCommandSelector()}

                    ${this.renderSaveButton()}

                </aside>

            </main>

        `;

    }


    // =====================================
    // Controle selecionado
    // =====================================

    renderSelectedControl() {

        return `

            <div class="designer-card">

                <h2>

                    Controle Selecionado

                </h2>


                <p id="selectedControl">

                    Nenhum controle selecionado

                </p>

            </div>

        `;

    }


    // =====================================
    // Comandos Lightroom
    // =====================================

    renderCommandSelector() {

        return `

            <div class="designer-card">

                <h2>

                    Comando Lightroom

                </h2>


                <select id="commandSelect">

                    <option value="">

                        Selecione um comando

                    </option>


                    ${this.renderCommands()}

                </select>

            </div>

        `;

    }


    renderCommands() {

        if (!Array.isArray(LightroomCommands)) {

            console.warn(

                "[KRONOS] LightroomCommands não é um array."

            );

            return "";

        }


        return LightroomCommands

            .map(command => `

                <option value="${command.id}">

                    ${command.category}
                    •
                    ${command.name}

                </option>

            `)

            .join("");

    }


    // =====================================
    // Botão salvar
    // =====================================

    renderSaveButton() {

        return `

            <div class="designer-card">

                <button
                    id="saveControl">

                    Salvar Configuração

                </button>

            </div>

        `;

    }


    // =====================================
    // Inicialização
    // =====================================

    async init() {

        if (this.initialized) {

            return;

        }


        this.canvas.init();


        this.registerCanvasEvents();

        this.registerSaveButton();


        this.initialized = true;

    }


    // =====================================
    // Eventos do Canvas
    // =====================================

    registerCanvasEvents() {

        const controls =
            document.querySelectorAll(
                ".kronos-control"
            );


        controls.forEach(control => {

            control.addEventListener(
                "click",
                () => {

                    this.updateSidebar();

                }
            );

        });

    }


    // =====================================
    // Atualizar Sidebar
    // =====================================

    updateSidebar() {

        const control =
            this.canvas.getSelectedControl();


        const selectedElement =
            document.getElementById(
                "selectedControl"
            );


        const commandSelect =
            document.getElementById(
                "commandSelect"
            );


        if (!selectedElement) {

            return;

        }


        if (!control) {

            selectedElement.textContent =
                "Nenhum controle selecionado";


            if (commandSelect) {

                commandSelect.value = "";

            }

            return;

        }


        selectedElement.textContent =
            control.label;


        if (commandSelect) {

            commandSelect.value =
                control.getCommand() || "";

        }

    }


    // =====================================
    // Salvar comando
    // =====================================

    registerSaveButton() {

        const button =
            document.getElementById(
                "saveControl"
            );


        if (!button) {

            return;

        }


        button.addEventListener(
            "click",
            async () => {

                await this.saveControl();

            }
        );

    }


    async saveControl() {

        const control =
            this.canvas.getSelectedControl();


        if (!control) {

            this.showMessage(

                "Selecione um controle."

            );

            return;

        }


        if (!control.configurable) {

            this.showMessage(

                "Este controle não pode ser configurado."

            );

            return;

        }


        const select =
            document.getElementById(
                "commandSelect"
            );


        if (!select) {

            return;

        }


        const command =
            select.value;


        if (!command) {

            this.showMessage(

                "Selecione um comando."

            );

            return;

        }


        try {

            this.controlRepository.setCommand(

                control.id,

                command

            );


            this.showMessage(

                `Comando salvo para ${control.label}.`

            );

        }

        catch (error) {

            console.error(

                "[KRONOS] Erro ao salvar comando:",
                error

            );


            this.showMessage(

                "Não foi possível salvar a configuração."

            );

        }

    }


    // =====================================
    // Mensagem
    // =====================================

    showMessage(message) {

        console.log(

            `[KRONOS] ${message}`

        );

    }


    // =====================================
    // Acesso ao Repository
    // =====================================

    getControlRepository() {

        return this.controlRepository;

    }


    // =====================================
    // Acesso ao Canvas
    // =====================================

    getCanvas() {

        return this.canvas;

    }


    // =====================================
    // Destruição
    // =====================================

    destroy() {

        this.canvas.destroy();

        this.controlRepository = null;

        this.canvas = null;

        this.initialized = false;

    }

}


module.exports = KronosDesigner;