const KronosRenderer = require("./KronosRenderer");


class KronosCanvas {

    constructor(controlRepository) {

        this.controlRepository =
            controlRepository;

        this.renderer =
            new KronosRenderer();

        this.container =
            null;

        this.initialized =
            false;

        this.boundClick =
            this.handleClick.bind(this);

    }


    // =====================================
    // Renderização principal
    // =====================================

    render() {

        const controls =
            this.controlRepository.getAll();


        return `

            <div
                class="kronos"
                id="kronosCanvas">

                <div class="kronos-panel">


                    <!-- ========================= -->
                    <!-- COLUNA ESQUERDA -->
                    <!-- ========================= -->

                    <div class="left-column">

                        ${this.renderLeftColumn(controls)}

                    </div>


                    <!-- ========================= -->
                    <!-- CENTRO -->
                    <!-- ========================= -->

                    <div class="center-panel">

                        ${this.renderTopEncoders(controls)}

                        ${this.renderDisplay(controls)}

                        ${this.renderMiddleEncoders(controls)}

                        ${this.renderBottomEncoders(controls)}

                        ${this.renderBottomArea(controls)}

                    </div>


                    <!-- ========================= -->
                    <!-- COLUNA DIREITA -->
                    <!-- ========================= -->

                    <div class="right-column">

                        ${this.renderRightColumn(controls)}

                    </div>


                </div>

            </div>

        `;

    }


    // =====================================
    // Coluna esquerda
    // =====================================

    renderLeftColumn(controls) {

        const ids = [

            "undo",
            "redo",
            "copy",
            "paste",
            "sync",
            "before"

        ];


        return controls

            .filter(control =>
                ids.includes(control.id)
            )

            .map(control =>
                this.renderer.render(control)
            )

            .join("");

    }


    // =====================================
    // Coluna direita
    // =====================================

    renderRightColumn(controls) {

        const ids = [

            "p1",
            "p2",
            "edit"

        ];


        return controls

            .filter(control =>
                ids.includes(control.id)
            )

            .map(control =>
                this.renderer.render(control)
            )

            .join("");

    }


    // =====================================
    // Encoders superiores
    // =====================================

    renderTopEncoders(controls) {

        const ids = [

            "exposure",
            "contrast",
            "highlights",
            "shadows",
            "whites"

        ];


        const encoders = controls

            .filter(control =>
                ids.includes(control.id)
            );


        if (!encoders.length) {

            return "";

        }


        return `

            <div class="encoder-row top-encoders">

                ${encoders

                    .map(control =>
                        this.renderer.render(control)
                    )

                    .join("")

                }

            </div>

        `;

    }


    // =====================================
    // Display
    // =====================================

    renderDisplay(controls) {

        const display =
            controls.find(control =>
                control.isDisplay &&
                control.isDisplay()
            );


        if (!display) {

            return "";

        }


        return `

            <div class="display-area">

                ${this.renderer.render(display)}

            </div>

        `;

    }


    // =====================================
    // Encoders do meio
    // =====================================

    renderMiddleEncoders(controls) {

        const ids = [

            "blacks",
            "temperature",
            "tint",
            "vibrance",
            "saturation"

        ];


        const encoders = controls

            .filter(control =>
                ids.includes(control.id)
            );


        if (!encoders.length) {

            return "";

        }


        return `

            <div class="encoder-row middle-encoders">

                ${encoders

                    .map(control =>
                        this.renderer.render(control)
                    )

                    .join("")

                }

            </div>

        `;

    }


    // =====================================
    // Encoders inferiores
    // =====================================

    renderBottomEncoders(controls) {

    const ids = [
        "encoder-left",
        "encoder-main",
        "encoder-right"
    ];

    const encoders = controls
        .filter(control =>
            ids.includes(control.id)
        );

    if (!encoders.length) {
        return "";
    }

    return `
        <div class="encoder-row bottom-encoders">

            ${encoders
                .map(control =>
                    this.renderer.render(control)
                )
                .join("")
            }

        </div>
    `;
}


    // =====================================
    // Área inferior
    // =====================================

    renderBottomArea(controls) {

        return `

            <div class="bottom-area">

                ${this.renderStars(controls)}

                ${this.renderActions(controls)}

            </div>

        `;

    }


    // =====================================
    // Estrelas
    // =====================================

    renderStars(controls) {

        const stars = controls.filter(control =>

            /^star\d+$/i.test(control.id)

        );


        if (!stars.length) {

            return "";

        }


        return `

            <div class="stars-section">

                ${stars

                    .map(control =>
                        this.renderer.render(control)
                    )

                    .join("")

                }

            </div>

        `;

    }


    // =====================================
    // Ações
    // =====================================

    renderActions(controls) {

        const ids = [

            "pick",
            "reject",
            "previous",
            "next",
            "fit",
            "oneToOne",
            "1:1"

        ];


        const actions = controls.filter(control =>

            ids.includes(control.id)

        );


        if (!actions.length) {

            return "";

        }


        return `

            <div class="actions-section">

                ${actions

                    .map(control =>
                        this.renderer.render(control)
                    )

                    .join("")

                }

            </div>

        `;

    }


    // =====================================
    // Inicialização
    // =====================================

    init() {

        if (this.initialized) {

            return;

        }


        this.container =
            document.getElementById(
                "kronosCanvas"
            );


        if (!this.container) {

            console.warn(
                "[KRONOS] Canvas não encontrado."
            );

            return;

        }


        this.container.addEventListener(
            "click",
            this.boundClick
        );


        this.initialized =
            true;


        console.log(
            "[KRONOS] Canvas inicializado."
        );

    }


    // =====================================
    // Clique
    // =====================================

    handleClick(event) {

        const element =
            event.target.closest(
                ".kronos-control"
            );


        if (!element) {

            return;

        }


        const id =
            element.dataset.id;


        if (!id) {

            return;

        }


        const control =
            this.controlRepository.findById(
                id
            );


        if (!control) {

            console.warn(
                `[KRONOS] Controle não encontrado: ${id}`
            );

            return;

        }


        if (!control.isEnabled()) {

            return;

        }


        this.controlRepository.select(id);


        console.log(
            `[KRONOS] Controle clicado: ${id}`
        );


        console.log(
            "[KRONOS] Controle selecionado:",
            control
        );


        this.refresh();


        this.emitSelection(control);

    }


    // =====================================
    // Evento de seleção
    // =====================================

    emitSelection(control) {

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

    }


    // =====================================
    // Controle selecionado
    // =====================================

    getSelectedControl() {

        return this.controlRepository
            .getSelected()[0] || null;

    }


    // =====================================
    // Atualização visual
    // =====================================

    refresh() {

        if (!this.container) {

            return;

        }


        const controls =
            this.controlRepository.getAll();


        this.container.innerHTML = `

            <div class="kronos-panel">

                <div class="left-column">

                    ${this.renderLeftColumn(controls)}

                </div>


                <div class="center-panel">

                    ${this.renderTopEncoders(controls)}

                    ${this.renderDisplay(controls)}

                    ${this.renderMiddleEncoders(controls)}

                    ${this.renderBottomEncoders(controls)}

                    ${this.renderBottomArea(controls)}

                </div>


                <div class="right-column">

                    ${this.renderRightColumn(controls)}

                </div>

            </div>

        `;

    }


    // =====================================
    // Destruição
    // =====================================

    destroy() {

        if (
            this.container &&
            this.boundClick
        ) {

            this.container.removeEventListener(
                "click",
                this.boundClick
            );

        }


        this.container =
            null;

        this.initialized =
            false;

    }

}


module.exports = KronosCanvas;