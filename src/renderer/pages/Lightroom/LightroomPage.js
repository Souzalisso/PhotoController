class LightroomPage {

    constructor() {

        this.initialized = false;

        this.status = "Aguardando KRONOS";

    }


    // =====================================
    // Renderização
    // =====================================

    render() {

        return `

            <main class="page lightroom-page">

                <header class="page-header">

                    <div>

                        <h1>

                            Lightroom

                        </h1>

                        <p>

                            Configuração dos comandos
                            utilizados pelo KRONOS

                        </p>

                    </div>

                </header>


                <section class="lightroom-grid">

                    ${this.renderStatusCard()}

                    ${this.renderInfoCard()}

                </section>


                <section class="lightroom-section">

                    ${this.renderCommandsCard()}

                </section>

            </main>

        `;

    }


    // =====================================
    // Status
    // =====================================

    renderStatusCard() {

        return `

            <div class="dashboard-card">

                <div class="card-header">

                    <h2>

                        Status

                    </h2>

                </div>


                <div class="lightroom-status">

                    <span
                        class="status-indicator"
                        id="lightroom-status-indicator">
                    </span>


                    <div>

                        <strong id="lightroom-status">

                            ${this.status}

                        </strong>


                        <span>

                            Comunicação com
                            o Lightroom

                        </span>

                    </div>

                </div>

            </div>

        `;

    }


    // =====================================
    // Informações
    // =====================================

    renderInfoCard() {

        return `

            <div class="dashboard-card">

                <div class="card-header">

                    <h2>

                        Integração

                    </h2>

                </div>


                <div class="lightroom-info">

                    <div class="lightroom-info-row">

                        <span>

                            Aplicação

                        </span>

                        <strong>

                            Adobe Lightroom

                        </strong>

                    </div>


                    <div class="lightroom-info-row">

                        <span>

                            Controle

                        </span>

                        <strong>

                            KRONOS Controller

                        </strong>

                    </div>


                    <div class="lightroom-info-row">

                        <span>

                            Perfis

                        </span>

                        <strong>

                            Não utilizado

                        </strong>

                    </div>

                </div>

            </div>

        `;

    }


    // =====================================
    // Comandos
    // =====================================

    renderCommandsCard() {

        return `

            <div class="dashboard-card">

                <div class="card-header">

                    <h2>

                        Comandos

                    </h2>

                </div>


                <div class="command-info">

                    <p>

                        Os comandos do Lightroom são
                        associados diretamente aos controles
                        do KRONOS.

                    </p>


                    <p>

                        A configuração é feita na página
                        <strong>Controles</strong>.

                    </p>


                    <div class="command-status">

                        <span>

                            Sistema de comandos

                        </span>


                        <strong>

                            Disponível

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
    // Atualizar status
    // =====================================

    setStatus(status, connected = false) {

        this.status =
            status || "Aguardando KRONOS";


        const statusElement =
            document.getElementById(
                "lightroom-status"
            );


        const indicator =
            document.getElementById(
                "lightroom-status-indicator"
            );


        if (statusElement) {

            statusElement.textContent =
                this.status;

        }


        if (indicator) {

            indicator.classList.toggle(
                "connected",
                connected
            );

        }

    }


    // =====================================
    // Estado conectado
    // =====================================

    setConnected(connected) {

        this.setStatus(

            connected
                ? "Lightroom conectado"
                : "Aguardando KRONOS",

            connected

        );

    }


    // =====================================
    // Destruição
    // =====================================

    destroy() {

        this.initialized = false;

    }

}


module.exports = LightroomPage;