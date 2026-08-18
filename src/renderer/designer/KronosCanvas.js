const KronosRenderer = require("./KronosRenderer");
const ControlRepository = require("./repositories/ControlRepository");


class KronosCanvas {

    constructor(controlRepository = null) {

        // =====================================
        // Dependências
        // =====================================

        this.controlRepository =
            controlRepository ||
            new ControlRepository();

        this.renderer =
            new KronosRenderer();


        // =====================================
        // Estado
        // =====================================

        this.container = null;

        this.initialized = false;

        this.boundClickHandler =
            this.handleClick.bind(this);

    }


    // =====================================
    // Renderização principal
    // =====================================

    render() {

        return `

            <div class="kronos">

                ${this.renderPanel()}

            </div>

        `;

    }


    // =====================================
    // Painel principal
    // =====================================

    renderPanel() {

        return `

            <div class="kronos-panel">

                ${this.renderLeftColumn()}

                ${this.renderCenter()}

                ${this.renderRightColumn()}

            </div>

        `;

    }


    // =====================================
    // Coluna esquerda
    // =====================================

    renderLeftColumn() {

        const controls =
            this.getControlsByGroup("left");


        return `

            <div class="left-column">

                ${controls

                    .map(control =>
                        this.renderer.render(control)
                    )

                    .join("")}

            </div>

        `;

    }


    // =====================================
    // Centro
    // =====================================

    renderCenter() {

        return `

            <div class="center-panel">

                ${this.renderTopEncoders()}

                ${this.renderDisplayArea()}

                ${this.renderBottomEncoders()}

                ${this.renderBottomArea()}

            </div>

        `;

    }


    // =====================================
    // Coluna direita
    // =====================================

    renderRightColumn() {

        const controls =
            this.getControlsByGroup("right");


        return `

            <div class="right-column">

                ${controls

                    .map(control =>
                        this.renderer.render(control)
                    )

                    .join("")}

            </div>

        `;

    }


    // =====================================
    // Encoders superiores
    // =====================================

    renderTopEncoders() {

        const controls =
            this.getControlsByGroup("top");


        return `

            <div class="encoder-row top-encoders">

                ${controls

                    .map(control =>
                        this.renderer.render(control)
                    )

                    .join("")}

            </div>

        `;

    }


    // =====================================
    // Display central
    // =====================================

    renderDisplayArea() {

        const display =
            this.controlRepository.findById(
                "display"
            );


        if (!display) {

            return `

                <div class="display-area">

                    <div class="display-error">

                        DISPLAY NÃO ENCONTRADO

                    </div>

                </div>

            `;

        }


        return `

            <div class="display-area">

                ${this.renderer.render(display)}

            </div>

        `;

    }


    // =====================================
    // Encoders inferiores
    // =====================================

    renderBottomEncoders() {

        const controls =
            this.getControlsByGroup("bottom");


        return `

            <div class="encoder-row bottom-encoders">

                ${controls

                    .map(control =>
                        this.renderer.render(control)
                    )

                    .join("")}

            </div>

        `;

    }


    // =====================================
    // Área inferior
    // =====================================

    renderBottomArea() {

        return `

            <div class="bottom-area">

                ${this.renderNavigationSection()}

                ${this.renderStarsSection()}

                ${this.renderActionsSection()}

            </div>

        `;

    }


    // =====================================
    // Navegação
    // =====================================

    renderNavigationSection() {

        const controls = [

            this.controlRepository.findById(
                "encoder-left"
            ),

            this.controlRepository.findById(
                "encoder-main"
            ),

            this.controlRepository.findById(
                "encoder-right"
            )

        ];


        return `

            <div class="navigation-section">

                ${controls

                    .filter(Boolean)

                    .map(control =>
                        this.renderer.render(control)
                    )

                    .join("")}

            </div>

        `;

    }


    // =====================================
    // Estrelas
    // =====================================

    renderStarsSection() {

        const controls =
            this.getControlsByGroup("stars");


        return `

            <div class="stars-section">

                ${controls

                    .map(control =>
                        this.renderer.render(control)
                    )

                    .join("")}

            </div>

        `;

    }


    // =====================================
    // Ações
    // =====================================

    renderActionsSection() {

        const controls =
            this.getControlsByGroup("actions");


        return `

            <div class="actions-section">

                ${controls

                    .map(control =>
                        this.renderer.render(control)
                    )

                    .join("")}

            </div>

        `;

    }


    // =====================================
    // Banco visual do KRONOS
    // =====================================

    getControlsByGroup(group) {

        const groups = {

            // -----------------------------
            // Lado esquerdo
            // -----------------------------

            left: [

                "undo",
                "redo",
                "copy",
                "paste",
                "sync",
                "before-after"

            ],


            // -----------------------------
            // Encoders superiores
            // -----------------------------

            top: [

                "exposure",
                "contrast",
                "highlights",
                "shadows",
                "whites"

            ],


            // -----------------------------
            // Encoders inferiores
            // -----------------------------

            bottom: [

                "blacks",
                "temperature",
                "tint",
                "vibrance",
                "saturation"

            ],


            // -----------------------------
            // Lado direito
            // -----------------------------

            right: [

                "p1",
                "p2",
                "edit"

            ],


            // -----------------------------
            // Avaliação
            // -----------------------------

            stars: [

                "rate-1",
                "rate-2",
                "rate-3",
                "rate-4",
                "rate-5"

            ],


            // -----------------------------
            // Ações inferiores
            // -----------------------------

            actions: [

                "pick",
                "reject",
                "previous",
                "next",
                "fit",
                "zoom-1-1"

            ]

        };


        const ids =
            groups[group] || [];


        return ids

            .map(id =>
                this.controlRepository.findById(id)
            )

            .filter(Boolean);

    }


    // =====================================
    // Inicialização
    // =====================================

    init(container = document) {

        // Evita registrar eventos duas vezes

        if (this.initialized) {

            return;

        }


        this.container =
            container;


        this.container.addEventListener(
            "click",
            this.boundClickHandler
        );


        this.initialized =
            true;


        this.updateSelection(
            this.container
        );

    }


    // =====================================
    // Evento de clique
    // =====================================

    handleClick(event) {

        const element =
            event.target.closest(
                ".kronos-control"
            );


        if (!element) {

            return;

        }


        if (
            this.container &&
            !this.container.contains(element)
        ) {

            return;

        }


        const id =
            element.dataset.id;


        if (!id) {

            return;

        }


        this.selectControl(
            id,
            this.container
        );

    }


    // =====================================
    // Seleção
    // =====================================

    selectControl(
        id,
        container = this.container || document
    ) {

        const control =
            this.controlRepository.select(id);


        if (!control) {

            console.warn(

                `[KRONOS] Controle não encontrado: ${id}`

            );

            return null;

        }


        console.log(

            `[KRONOS] Controle selecionado: ${control.id}`

        );


        this.updateSelection(
            container
        );


        // =================================
        // Notifica o Designer
        // =================================

        document.dispatchEvent(

            new CustomEvent(
                "kronos-control-selected",
                {
                    detail: {
                        control
                    }
                }
            )

        );


        return control;

    }


    // =====================================
    // Atualização visual da seleção
    // =====================================

    updateSelection(
        container = this.container || document
    ) {

        if (!container) {

            return;

        }


        const elements =
            container.querySelectorAll(
                ".kronos-control"
            );


        elements.forEach(element => {

            element.classList.remove(
                "selected"
            );

        });


        const selected =
            this.controlRepository
                .getSelected();


        for (const control of selected) {

            const element =
                container.querySelector(
                    `[data-id="${control.id}"]`
                );


            if (element) {

                element.classList.add(
                    "selected"
                );

            }

        }

    }


    // =====================================
    // Ativar controle visualmente
    // =====================================

    setControlActive(
        id,
        active = true
    ) {

        const container =
            this.container || document;


        const element =
            container.querySelector(
                `[data-id="${id}"]`
            );


        if (!element) {

            return;

        }


        element.classList.toggle(
            "active",
            Boolean(active)
        );

    }


    // =====================================
    // Estado de conexão
    // =====================================

    setConnected(connected) {

        const container =
            this.container || document;


        const panel =
            container.querySelector(
                ".kronos-panel"
            );


        if (!panel) {

            return;

        }


        panel.classList.toggle(
            "connected",
            Boolean(connected)
        );

    }


    // =====================================
    // Atualização do Display
    // =====================================

    updateDisplay({

        title = "",
        value = "",
        status = ""

    } = {}) {

        const display =
            this.controlRepository.findById(
                "display"
            );


        if (!display) {

            return;

        }


        this.renderer.updateDisplay(

            display,

            {
                title,
                value,
                status
            }

        );

    }


    // =====================================
    // Limpar Display
    // =====================================

    clearDisplay() {

        this.renderer.clearDisplay();

    }


    // =====================================
    // Controle selecionado
    // =====================================

    getSelectedControl() {

        const selected =
            this.controlRepository
                .getSelected();


        if (!selected.length) {

            return null;

        }


        return selected[0];

    }


    // =====================================
    // Atualização
    // =====================================

    refresh(
        container = this.container || document
    ) {

        this.updateSelection(
            container
        );

    }


    // =====================================
    // Destruição
    // =====================================

    destroy() {

        if (
            this.container &&
            this.boundClickHandler
        ) {

            this.container.removeEventListener(
                "click",
                this.boundClickHandler
            );

        }


        this.container = null;

        this.initialized = false;

        this.controlRepository = null;

        this.renderer = null;

    }

}


module.exports = KronosCanvas;