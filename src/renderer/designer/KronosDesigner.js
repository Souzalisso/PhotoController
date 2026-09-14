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
            <div
                class="designer-card"
                id="commandCard"
            >

                <h2>
                    Comando Lightroom
                </h2>

                <div
                    id="buttonCommandContainer"
                >

                    <label for="commandSelect">
                        Comando
                    </label>

                    <select
                        id="commandSelect"
                        disabled
                    >

                        <option value="">
                            Selecione um controle
                        </option>

                        ${this.renderCommands()}

                    </select>

                </div>


                <div
                    id="encoderCommandContainer"
                    style="display: none;"
                >

                    <label for="clockwiseCommandSelect">
                        ↻ Horário
                    </label>

                    <select
                        id="clockwiseCommandSelect"
                        disabled
                    >

                        <option value="">
                            Selecione o comando
                        </option>

                        ${this.renderCommands()}

                    </select>


                    <label
                        for="counterClockwiseCommandSelect"
                    >
                        ↺ Anti-horário
                    </label>

                    <select
                        id="counterClockwiseCommandSelect"
                        disabled
                    >

                        <option value="">
                            Selecione o comando
                        </option>

                        ${this.renderCommands()}

                    </select>

                </div>

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
                    command.category ||
                    "Geral";

                const name =
                    command.name ||
                    command.id;


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
                    disabled
                >
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


        // =================================
        // Carrega configuração salva
        // =================================

        await this.loadConfiguration();


        // =================================
        // Atualiza sidebar
        // =================================

        this.updateSidebar();
    }


    // =====================================
    // Carregar configuração
    // =====================================

    async loadConfiguration() {

        try {

            if (
                !window.photoController ||
                typeof window.photoController
                    .loadConfiguration !== "function"
            ) {

                console.warn(
                    "[KRONOS] API de configuração não disponível."
                );

                return;
            }


            const configuration =
                await window.photoController
                    .loadConfiguration();


            if (
                !configuration ||
                typeof configuration !== "object"
            ) {

                return;
            }


            for (
                const [
                    controlId,
                    configurationValue
                ]
                of Object.entries(configuration)
            ) {

                if (!configurationValue) {
                    continue;
                }


                const control =
                    this.controlRepository.findById(
                        controlId
                    );


                if (!control) {

                    console.warn(
                        `[KRONOS] Controle salvo não encontrado: ${controlId}`
                    );

                    continue;
                }


                if (!control.configurable) {
                    continue;
                }


                // =================================
                // Encoder
                // =================================

                if (
                    control.isEncoder() &&
                    typeof configurationValue === "object"
                ) {

                    if (
                        configurationValue.clockwise
                    ) {

                        this.controlRepository
                            .setClockwiseCommand(
                                controlId,
                                configurationValue.clockwise
                            );
                    }


                    if (
                        configurationValue.counterClockwise
                    ) {

                        this.controlRepository
                            .setCounterClockwiseCommand(
                                controlId,
                                configurationValue.counterClockwise
                            );
                    }


                    continue;
                }


                // =================================
                // Comando normal
                // =================================

                if (
                    typeof configurationValue === "string"
                ) {

                    this.controlRepository.setCommand(
                        controlId,
                        configurationValue
                    );
                }
            }


            console.log(
                "[KRONOS] Configuração carregada:",
                configuration
            );
        }

        catch (error) {

            console.error(
                "[KRONOS] Erro ao carregar configuração:",
                error
            );
        }
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


        const clockwiseSelect =
            document.getElementById(
                "clockwiseCommandSelect"
            );


        const counterClockwiseSelect =
            document.getElementById(
                "counterClockwiseCommandSelect"
            );


        const buttonContainer =
            document.getElementById(
                "buttonCommandContainer"
            );


        const encoderContainer =
            document.getElementById(
                "encoderCommandContainer"
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


            if (buttonContainer) {

                buttonContainer.style.display =
                    "block";
            }


            if (encoderContainer) {

                encoderContainer.style.display =
                    "none";
            }


            if (commandSelect) {

                commandSelect.value = "";

                commandSelect.disabled =
                    true;
            }


            if (clockwiseSelect) {

                clockwiseSelect.value = "";

                clockwiseSelect.disabled =
                    true;
            }


            if (counterClockwiseSelect) {

                counterClockwiseSelect.value =
                    "";

                counterClockwiseSelect.disabled =
                    true;
            }


            if (saveButton) {

                saveButton.disabled =
                    true;
            }


            return;
        }


        // =================================
        // Nome
        // =================================

        if (selectedElement) {

            selectedElement.textContent =
                control.label ||
                control.id;
        }


        // =================================
        // Tipo
        // =================================

        if (typeElement) {

            typeElement.textContent =
                `Tipo: ${control.type}`;
        }


        const configurable =
            Boolean(
                control.configurable
            );


        // =================================
        // Encoder
        // =================================

        if (control.isEncoder()) {

            if (buttonContainer) {

                buttonContainer.style.display =
                    "none";
            }


            if (encoderContainer) {

                encoderContainer.style.display =
                    "block";
            }


            if (clockwiseSelect) {

                clockwiseSelect.disabled =
                    !configurable;

                clockwiseSelect.value =
                    configurable
                        ? (
                            control.getClockwiseCommand() ||
                            ""
                        )
                        : "";
            }


            if (counterClockwiseSelect) {

                counterClockwiseSelect.disabled =
                    !configurable;

                counterClockwiseSelect.value =
                    configurable
                        ? (
                            control.getCounterClockwiseCommand() ||
                            ""
                        )
                        : "";
            }

        }

        // =================================
        // Botão
        // =================================

        else {

            if (buttonContainer) {

                buttonContainer.style.display =
                    "block";
            }


            if (encoderContainer) {

                encoderContainer.style.display =
                    "none";
            }


            if (commandSelect) {

                commandSelect.disabled =
                    !configurable;

                commandSelect.value =
                    configurable
                        ? (
                            control.getCommand() ||
                            ""
                        )
                        : "";
            }
        }


        if (saveButton) {

            saveButton.disabled =
                !configurable;
        }
    }


    // =====================================
    // Salvar configuração
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


        try {

            // =================================
            // Encoder
            // =================================

            if (control.isEncoder()) {

                const clockwiseSelect =
                    document.getElementById(
                        "clockwiseCommandSelect"
                    );


                const counterClockwiseSelect =
                    document.getElementById(
                        "counterClockwiseCommandSelect"
                    );


                if (
                    !clockwiseSelect ||
                    !counterClockwiseSelect
                ) {

                    return;
                }


                const clockwiseCommand =
                    clockwiseSelect.value;


                const counterClockwiseCommand =
                    counterClockwiseSelect.value;


                if (
                    !clockwiseCommand &&
                    !counterClockwiseCommand
                ) {

                    this.showMessage(
                        "Selecione pelo menos um comando do encoder."
                    );

                    return;
                }


                // =================================
                // API - horário
                // =================================

                if (
                    clockwiseCommand &&
                    (
                        !window.photoController ||
                        typeof window.photoController
                            .saveClockwiseCommand !==
                            "function"
                    )
                ) {

                    throw new Error(
                        "API de comando horário não disponível."
                    );
                }


                // =================================
                // API - anti-horário
                // =================================

                if (
                    counterClockwiseCommand &&
                    (
                        !window.photoController ||
                        typeof window.photoController
                            .saveCounterClockwiseCommand !==
                            "function"
                    )
                ) {

                    throw new Error(
                        "API de comando anti-horário não disponível."
                    );
                }


                if (clockwiseCommand) {

                    await window.photoController
                        .saveClockwiseCommand(
                            control.id,
                            clockwiseCommand
                        );

                    this.controlRepository
                        .setClockwiseCommand(
                            control.id,
                            clockwiseCommand
                        );
                }


                if (counterClockwiseCommand) {

                    await window.photoController
                        .saveCounterClockwiseCommand(
                            control.id,
                            counterClockwiseCommand
                        );

                    this.controlRepository
                        .setCounterClockwiseCommand(
                            control.id,
                            counterClockwiseCommand
                        );
                }


                this.canvas.refresh();

                this.updateSidebar(
                    control
                );


                this.showMessage(
                    `Comandos do encoder ${control.label} salvos.`
                );


                console.log(
                    "[KRONOS] Configuração do encoder salva:",
                    {
                        control: control.id,
                        clockwise: clockwiseCommand,
                        counterClockwise:
                            counterClockwiseCommand
                    }
                );


                return;
            }


            // =================================
            // Botão
            // =================================

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


            if (
                !window.photoController ||
                typeof window.photoController
                    .saveControl !== "function"
            ) {

                throw new Error(
                    "API de configuração não disponível."
                );
            }


            await window.photoController
                .saveControl(
                    control.id,
                    command
                );


            this.controlRepository.setCommand(
                control.id,
                command
            );


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