const KronosCanvas = require("./KronosCanvas");
const ControlRepository = require("./repositories/ControlRepository");

const LightroomCommands =
    require("../../core/data/lightroom/LightroomCommands");


class KronosDesigner {

    constructor() {

        // =====================================
        // Banco de controles
        // =====================================

        this.controlRepository =
            new ControlRepository();


        // =====================================
        // Canvas do hardware
        // =====================================

        this.canvas =
            new KronosCanvas(
                this.controlRepository
            );


        // =====================================
        // Estado
        // =====================================

        this.initialized = false;

        this.boundControlSelected =
            this.handleControlSelected.bind(this);

        this.boundSaveControl =
            this.handleSaveControl.bind(this);

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

                <small id="selectedControlType">

                    --

                </small>

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

                <select
                    id="commandSelect"
                    disabled>

                    <option value="">

                        Selecione um controle

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

            .map(command => {

                const id =
                    this.escapeAttribute(
                        command.id
                    );

                const category =
                    command.category || "Geral";

                const name =
                    command.name || command.id;


                return `

                    <option value="${id}">

                        ${this.escapeHTML(category)}
                        •
                        ${this.escapeHTML(name)}

                    </option>

                `;

            })

            .join("");

    }


    // =====================================
    // Botão salvar
    // =====================================

    renderSaveButton() {

        return `

            <div class="designer-card">

                <button
                    id="saveControl"
                    disabled>

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


        this.canvas.init(
            document
        );


        document.addEventListener(
            "kronos-control-selected",
            this.boundControlSelected
        );


        const saveButton =
            document.getElementById(
                "saveControl"
            );


        if (saveButton) {

            saveButton.addEventListener(
                "click",
                this.boundSaveControl
            );

        }


        this.initialized = true;


        this.updateSidebar();

    }


    // =====================================
    // Controle selecionado
    // =====================================

    handleControlSelected(event) {

        const control =
            event?.detail?.control;


        console.log(
            "[KRONOS] Designer recebeu seleção:",
            control
        );


        this.updateSidebar(
            control
        );

    }


    // =====================================
    // Atualizar painel
    // =====================================

    updateSidebar(control = null) {

        if (!control) {

            control =
                this.canvas.getSelectedControl();

        }


        const selectedElement =
            document.getElementById(
                "selectedControl"
            );


        const typeElement =
            document.getElementById(
                "selectedControlType"
            );


        const commandSelect =
            document.getElementById(
                "commandSelect"
            );


        const saveButton =
            document.getElementById(
                "saveControl"
            );


        // =================================
        // Nenhum controle
        // =================================

        if (!control) {

            if (selectedElement) {

                selectedElement.textContent =
                    "Nenhum controle selecionado";

            }


            if (typeElement) {

                typeElement.textContent =
                    "--";

            }


            if (commandSelect) {

                commandSelect.value = "";

                commandSelect.disabled = true;

            }


            if (saveButton) {

                saveButton.disabled = true;

            }


            return;

        }


        // =================================
        // Nome
        // =================================

        if (selectedElement) {

            selectedElement.textContent =
                control.label || control.id;

        }


        // =================================
        // Tipo
        // =================================

        if (typeElement) {

            typeElement.textContent =
                `Tipo: ${control.type}`;

        }


        // =================================
        // Configuração
        // =================================

        const configurable =
            Boolean(
                control.configurable
            );


        if (commandSelect) {

            commandSelect.disabled =
                !configurable;


            commandSelect.value =
                configurable
                    ? (
                        control.getCommand() || ""
                    )
                    : "";

        }


        if (saveButton) {

            saveButton.disabled =
                !configurable;

        }

    }


    // =====================================
    // Salvar comando
    // =====================================

    async handleSaveControl() {

        await this.saveControl();

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


        const commandSelect =
            document.getElementById(
                "commandSelect"
            );


        if (!commandSelect) {

            return;

        }


        const command =
            commandSelect.value;


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


            // Atualiza o estado visual

            this.canvas.refresh();


            this.updateSidebar(
                control
            );


            this.showMessage(
                `Comando salvo para ${control.label}.`
            );


            console.log(
                "[KRONOS] Configuração salva:",
                {
                    control: control.id,
                    command
                }
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
    // Repository
    // =====================================

    getControlRepository() {

        return this.controlRepository;

    }


    // =====================================
    // Canvas
    // =====================================

    getCanvas() {

        return this.canvas;

    }


    // =====================================
    // Escape HTML
    // =====================================

    escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    escapeAttribute(value) {

        return this.escapeHTML(value);

    }


    // =====================================
    // Destruição
    // =====================================

    destroy() {

        document.removeEventListener(
            "kronos-control-selected",
            this.boundControlSelected
        );


        const saveButton =
            document.getElementById(
                "saveControl"
            );


        if (saveButton) {

            saveButton.removeEventListener(
                "click",
                this.boundSaveControl
            );

        }


        if (this.canvas) {

            this.canvas.destroy();

        }


        this.controlRepository =
            null;

        this.canvas =
            null;

        this.initialized =
            false;

    }

}


module.exports = KronosDesigner;