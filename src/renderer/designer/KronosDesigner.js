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

    // =====================================
// Eventos do Canvas
// =====================================

registerCanvasEvents() {

    const controls =
        document.querySelectorAll(
            ".kronos-control"
        );


    controls.forEach(controlElement => {

        controlElement.addEventListener(
            "click",
            () => {

                const id =
                    controlElement.dataset.id;


                if (!id) {

                    console.warn(
                        "[KRONOS] Controle clicado sem ID."
                    );

                    return;

                }


                console.log(
                    `[KRONOS] Controle clicado: ${id}`
                );


                // =====================================
                // Selecionar no Repository
                // =====================================

                const control =
                    this.controlRepository.select(id);


                if (!control) {

                    console.warn(
                        `[KRONOS] Controle não encontrado: ${id}`
                    );

                    return;

                }


                console.log(
                    "[KRONOS] Controle selecionado:",
                    control
                );


                // =====================================
                // Atualizar aparência
                // =====================================

                document
                    .querySelectorAll(".kronos-control")
                    .forEach(element => {

                        element.classList.remove(
                            "selected"
                        );

                    });


                controlElement.classList.add(
                    "selected"
                );


                // =====================================
                // Atualizar painel lateral
                // =====================================

                this.updateSidebar();

            }
        );

    });

}


    // =====================================
    // Atualizar Sidebar
    // =====================================

    // =====================================
// Atualizar Sidebar
// =====================================

updateSidebar() {

    const control =
        this.controlRepository.getSelected()[0] || null;


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


    // =====================================
    // Nenhum controle
    // =====================================

    if (!control) {

        selectedElement.textContent =
            "Nenhum controle selecionado";


        if (commandSelect) {

            commandSelect.value = "";

        }


        return;

    }


    // =====================================
    // Controle selecionado
    // =====================================

    selectedElement.textContent =
        control.label;


    if (commandSelect) {

        commandSelect.value =
            control.getCommand() || "";

    }


    console.log(
        `[KRONOS] Selecionado: ${control.id} - ${control.label}`
    );

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

    /*
     * O Designer permanece disponível durante
     * toda a execução da aplicação.
     *
     * Não anulamos canvas nem repository,
     * pois a PageManager reutiliza esta página.
     */

    this.initialized = false;

}

}


module.exports = KronosDesigner;