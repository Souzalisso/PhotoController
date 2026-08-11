class AboutPage {

    constructor() {

        this.initialized = false;

    }


    // =====================================
    // Renderização
    // =====================================

    render() {

        return `

            <main class="page about-page">

                <header class="page-header">

                    <div>

                        <h1>

                            Sobre o KRONOS

                        </h1>

                        <p>

                            Informações sobre o projeto
                            KRONOS Controller

                        </p>

                    </div>

                </header>


                <section class="about-grid">

                    ${this.renderProjectCard()}

                    ${this.renderHardwareCard()}

                    ${this.renderSoftwareCard()}

                </section>


                <section class="about-section">

                    ${this.renderArchitectureCard()}

                </section>

            </main>

        `;

    }


    // =====================================
    // Projeto
    // =====================================

    renderProjectCard() {

        return `

            <div class="dashboard-card">

                <div class="card-header">

                    <h2>

                        Projeto

                    </h2>

                </div>


                <div class="about-content">

                    <h3>

                        KRONOS Controller

                    </h3>


                    <p>

                        Controlador físico desenvolvido
                        para agilizar o fluxo de trabalho
                        de fotógrafos e videomakers.

                    </p>

                </div>

            </div>

        `;

    }


    // =====================================
    // Hardware
    // =====================================

    renderHardwareCard() {

        return `

            <div class="dashboard-card">

                <div class="card-header">

                    <h2>

                        Hardware

                    </h2>

                </div>


                <div class="about-content">

                    <p>

                        O KRONOS possui uma interface
                        física composta por botões,
                        encoders, LEDs e display.

                    </p>


                    <strong>

                        Arduino Mega

                    </strong>

                </div>

            </div>

        `;

    }


    // =====================================
    // Software
    // =====================================

    renderSoftwareCard() {

        return `

            <div class="dashboard-card">

                <div class="card-header">

                    <h2>

                        Software

                    </h2>

                </div>


                <div class="about-content">

                    <p>

                        Aplicação desktop desenvolvida
                        com Electron e Node.js para
                        controlar e configurar o hardware.

                    </p>

                </div>

            </div>

        `;

    }


    // =====================================
    // Arquitetura
    // =====================================

    renderArchitectureCard() {

        return `

            <div class="dashboard-card">

                <div class="card-header">

                    <h2>

                        Arquitetura

                    </h2>

                </div>


                <div class="architecture">

                    <div class="architecture-item">

                        <span>

                            Hardware

                        </span>

                        <strong>

                            Arduino Mega

                        </strong>

                    </div>


                    <div class="architecture-arrow">

                        ↓

                    </div>


                    <div class="architecture-item">

                        <span>

                            Comunicação

                        </span>

                        <strong>

                            Serial / KRONOS Protocol

                        </strong>

                    </div>


                    <div class="architecture-arrow">

                        ↓

                    </div>


                    <div class="architecture-item">

                        <span>

                            Backend

                        </span>

                        <strong>

                            HardwareService

                        </strong>

                    </div>


                    <div class="architecture-arrow">

                        ↓

                    </div>


                    <div class="architecture-item">

                        <span>

                            Interface

                        </span>

                        <strong>

                            Electron Renderer

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
    // Destruição
    // =====================================

    destroy() {

        this.initialized = false;

    }

}


module.exports = AboutPage;