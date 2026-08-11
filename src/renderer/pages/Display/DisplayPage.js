class DisplayPage {

    constructor() {

        this.initialized = false;

        this.display = {

            title: "Lightroom",

            value: "Ready",

            status: ""

        };

    }


    // =====================================
    // Renderização
    // =====================================

    render() {

        return `

            <main class="page display-page">

                <header class="page-header">

                    <div>

                        <h1>

                            Display

                        </h1>

                        <p>

                            Visualização do display
                            OLED do KRONOS

                        </p>

                    </div>

                </header>


                <section class="display-workspace">

                    ${this.renderDisplay()}

                    ${this.renderDisplayInfo()}

                </section>

            </main>

        `;

    }


    // =====================================
    // Display OLED
    // =====================================

    renderDisplay() {

        return `

            <div class="display-preview-card">

                <div class="display-preview">

                    <div class="oled-header">

                        KRONOS

                    </div>


                    <div class="oled-body">

                        <div
                            class="oled-line"
                            id="display-preview-line-1">

                            ${this.display.title}

                        </div>


                        <div
                            class="oled-line"
                            id="display-preview-line-2">

                            ${this.display.value}

                        </div>


                        <div
                            class="oled-line"
                            id="display-preview-line-3">

                            ${this.display.status}

                        </div>

                    </div>

                </div>

            </div>

        `;

    }


    // =====================================
    // Informações
    // =====================================

    renderDisplayInfo() {

        return `

            <div class="dashboard-card display-info-card">

                <div class="card-header">

                    <h2>

                        Display do Hardware

                    </h2>

                </div>


                <div class="display-info">

                    <div class="display-info-row">

                        <span>

                            Dispositivo

                        </span>

                        <strong>

                            KRONOS Controller

                        </strong>

                    </div>


                    <div class="display-info-row">

                        <span>

                            Tipo

                        </span>

                        <strong>

                            OLED

                        </strong>

                    </div>


                    <div class="display-info-row">

                        <span>

                            Função

                        </span>

                        <strong>

                            Status e informações

                        </strong>

                    </div>


                    <div class="display-info-row">

                        <span>

                            Hardware

                        </span>

                        <strong>

                            Arduino Mega

                        </strong>

                    </div>

                </div>

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


        this.initialized = true;

    }


    // =====================================
    // Atualizar display
    // =====================================

    updateDisplay({

        title = "",

        value = "",

        status = ""

    } = {}) {

        this.display = {

            title,

            value,

            status

        };


        this.updateElements();

    }


    // =====================================
    // Atualização dos elementos
    // =====================================

    updateElements() {

        const title =
            document.getElementById(
                "display-preview-line-1"
            );


        const value =
            document.getElementById(
                "display-preview-line-2"
            );


        const status =
            document.getElementById(
                "display-preview-line-3"
            );


        if (title) {

            title.textContent =
                this.display.title;

        }


        if (value) {

            value.textContent =
                this.display.value;

        }


        if (status) {

            status.textContent =
                this.display.status;

        }

    }


    // =====================================
    // Limpar display
    // =====================================

    clearDisplay() {

        this.updateDisplay({

            title: "",

            value: "",

            status: ""

        });

    }


    // =====================================
    // Reset
    // =====================================

    resetDisplay() {

        this.updateDisplay({

            title: "Lightroom",

            value: "Ready",

            status: ""

        });

    }


    // =====================================
    // Destruição
    // =====================================

    destroy() {

        this.initialized = false;

    }

}


module.exports = DisplayPage;