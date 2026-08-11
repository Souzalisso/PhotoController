class DashboardPage {

    constructor() {

        this.initialized = false;

    }


    // =====================================
    // Renderização
    // =====================================

    render() {

        return `

            <main class="page dashboard-page">

                <header class="page-header">

                    <div>

                        <h1>

                            KRONOS Controller

                        </h1>

                        <p>

                            Painel de controle

                            do hardware KRONOS

                        </p>

                    </div>

                </header>


                <section class="dashboard-grid">

                    ${this.renderHardwareCard()}

                    ${this.renderConnectionCard()}

                    ${this.renderLastEventCard()}

                </section>


                <section class="dashboard-section">

                    <div class="dashboard-card">

                        <div class="card-header">

                            <h2>

                                Sistema

                            </h2>

                        </div>


                        <div class="system-status">

                            <div class="status-row">

                                <span>

                                    Aplicação

                                </span>

                                <strong>

                                    KRONOS Controller

                                </strong>

                            </div>


                            <div class="status-row">

                                <span>

                                    Interface

                                </span>

                                <strong>

                                    Online

                                </strong>

                            </div>


                            <div class="status-row">

                                <span>

                                    Perfis

                                </span>

                                <strong>

                                    Desativados

                                </strong>

                            </div>

                        </div>

                    </div>

                </section>

            </main>

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


                <div class="dashboard-status">

                    <span
                        class="status-indicator"
                        id="hardware-status-indicator">
                    </span>


                    <div>

                        <strong id="hardware-status">

                            Desconectado

                        </strong>


                        <span>

                            Arduino Mega

                        </span>

                    </div>

                </div>

            </div>

        `;

    }


    // =====================================
    // Conexão
    // =====================================

    renderConnectionCard() {

        return `

            <div class="dashboard-card">

                <div class="card-header">

                    <h2>

                        Comunicação

                    </h2>

                </div>


                <div class="dashboard-value">

                    <strong id="connection-port">

                        COM3

                    </strong>


                    <span>

                        Porta serial

                    </span>

                </div>

            </div>

        `;

    }


    // =====================================
    // Último evento
    // =====================================

    renderLastEventCard() {

        return `

            <div class="dashboard-card">

                <div class="card-header">

                    <h2>

                        Último Evento

                    </h2>

                </div>


                <div class="dashboard-value">

                    <strong id="last-event">

                        Nenhum evento

                    </strong>


                    <span>

                        Aguardando hardware

                    </span>

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
    // Atualizar status do hardware
    // =====================================

    setHardwareStatus(
        connected
    ) {

        const status =
            document.getElementById(
                "hardware-status"
            );


        const indicator =
            document.getElementById(
                "hardware-status-indicator"
            );


        if (status) {

            status.textContent =
                connected
                    ? "Conectado"
                    : "Desconectado";

        }


        if (indicator) {

            indicator.classList.toggle(
                "connected",
                connected
            );

        }

    }


    // =====================================
    // Atualizar último evento
    // =====================================

    setLastEvent(event) {

        const element =
            document.getElementById(
                "last-event"
            );


        if (!element) {

            return;

        }


        if (!event) {

            element.textContent =
                "Nenhum evento";

            return;

        }


        if (typeof event === "string") {

            element.textContent =
                event;

            return;

        }


        if (event.id !== undefined) {

            element.textContent =
                `${event.id} • ${event.action || ""}`;

            return;

        }


        element.textContent =
            JSON.stringify(event);

    }


    // =====================================
    // Destruição
    // =====================================

    destroy() {

        this.initialized = false;

    }

}


module.exports = DashboardPage;