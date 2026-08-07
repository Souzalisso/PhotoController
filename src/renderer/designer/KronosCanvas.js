const KronosRenderer = require("./KronosRenderer");
const ControlRepository = require("./repositories/ControlRepository");


class KronosCanvas {

    constructor(controlRepository = null) {

        this.controlRepository =
            controlRepository ||
            new ControlRepository();

        this.renderer = new KronosRenderer();

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
    // Display
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
    // Buscar grupo
    // =====================================

    getControlsByGroup(group) {

        const groups = {

            left: [
                "undo",
                "redo",
                "copy",
                "paste",
                "sync",
                "before-after"
            ],

            top: [
                "exposure",
                "contrast",
                "highlights",
                "shadows",
                "whites"
            ],

            bottom: [
                "blacks",
                "temperature",
                "tint",
                "vibrance",
                "saturation"
            ],

            right: [
                "p1",
                "p2",
                "edit"
            ],

            stars: [
                "rate-1",
                "rate-2",
                "rate-3",
                "rate-4",
                "rate-5"
            ],

            actions: [
                "pick",
                "reject",
                "previous",
                "next",
                "fit",
                "zoom-1-1"
            ]

        };


        const ids = groups[group] || [];


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

        this.bindEvents(container);

        this.updateSelection(container);

    }


    // =====================================
    // Eventos
    // =====================================

    bindEvents(container) {

        container

            .querySelectorAll(".kronos-control")

            .forEach(element => {

                element.addEventListener(
                    "click",
                    () => {

                        this.selectControl(
                            element.dataset.id,
                            container
                        );

                    }
                );

            });

    }


    // =====================================
    // Seleção
    // =====================================

    selectControl(
        id,
        container = document
    ) {

        const control =
            this.controlRepository.select(id);


        if (!control) {

            return;

        }


        this.updateSelection(container);

    }


    // =====================================
    // Atualizar seleção visual
    // =====================================

    updateSelection(
        container = document
    ) {

        container

            .querySelectorAll(
                ".kronos-control"
            )

            .forEach(element => {

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
    // Ativar controle
    // =====================================

    setControlActive(
        id,
        active = true
    ) {

        const element =
            document.querySelector(
                `[data-id="${id}"]`
            );


        if (!element) {

            return;

        }


        element.classList.toggle(
            "active",
            active
        );

    }


    // =====================================
    // Conexão
    // =====================================

    setConnected(connected) {

        const panel =
            document.querySelector(
                ".kronos-panel"
            );


        if (!panel) {

            return;

        }


        panel.classList.toggle(
            "connected",
            connected
        );

    }


    // =====================================
    // Display
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


        return selected.length
            ? selected[0]
            : null;

    }


    // =====================================
    // Atualização
    // =====================================

    refresh(
        container = document
    ) {

        this.updateSelection(
            container
        );

    }


    // =====================================
    // Destruição
    // =====================================

    destroy() {

        this.controlRepository = null;

        this.renderer = null;

    }

}


module.exports = KronosCanvas;