class HardwarePage {

    constructor() {

        this.initialized = false;

        this.connected = false;

    }


    // =====================================
    // Renderização
    // =====================================

    render() {

        return `

            <main class="page hardware-page">

                <header class="page-header">

                    <div>

                        <h1>

                            Hardware

                        </h1>

                        <p>

                            Gerenciamento e status
                            do hardware KRONOS

                        </p>

                    </div>

                </header>


                <section class="hardware-grid">

                    ${this.renderConnectionCard()}

                    ${this.renderDeviceCard()}

                    ${this.renderSerialCard()}

                </section>


                <section class="hardware-section">

                    ${this.renderHardwareInfo()}

                </section>

            </main>

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

                        Conexão

                    </h2>

                </div>


                <div class="hardware-status">

                    <span
                        id="hardware-page-indicator"
                        class="status-indicator">
                    </span>


                    <div>

                        <strong id="hardware-page-status">

                            Desconectado

                        </strong>


                        <span>

                            Status do hardware

                        </span>

                    </div>

                </div>


                <div class="hardware-actions">

                    <button
                        id="hardware-connect"
                        class="hardware-button">

                        Conectar

                    </button>


                    <button
                        id="hardware-disconnect"
                        class="hardware-button"
                        disabled>

                        Desconectar

                    </button>

                </div>

            </div>

        `;

    }


    // =====================================
    // Dispositivo
    // =====================================

    renderDeviceCard() {

        return `

            <div class="dashboard-card">

                <div class="card-header">

                    <h2>

                        Dispositivo

                    </h2>

                </div>


                <div class="hardware-value">

                    <strong>

                        KRONOS Controller

                    </strong>


                    <span>

                        Arduino Mega

                    </span>

                </div>

            </div>

        `;

    }


    // =====================================
    // Comunicação serial
    // =====================================

    renderSerialCard() {

        return `

            <div class="dashboard-card">

                <div class="card-header">

                    <h2>

                        Comunicação

                    </h2>

                </div>


                <div class="hardware-value">

                    <strong id="hardware-port">

                        COM3

                    </strong>


                    <span>

                        9600 baud

                    </span>

                </div>

            </div>

        `;

    }


    // =====================================
    // Informações
    // =====================================

    renderHardwareInfo() {

        return `

            <div class="dashboard-card">

                <div class="card-header">

                    <h2>

                        Informações do KRONOS

                    </h2>

                </div>


                <div class="hardware-info">

                    <div class="hardware-info-row">

                        <span>

                            Controlador

                        </span>

                        <strong>

                            Arduino Mega

                        </strong>

                    </div>


                    <div class="hardware-info-row">

                        <span>

                            Protocolo

                        </span>

                        <strong>

                            KRONOS Protocol

                        </strong>

                    </div>


                    <div class="hardware-info-row">

                        <span>

                            Porta

                        </span>

                        <strong>

                            COM3

                        </strong>

                    </div>


                    <div class="hardware-info-row">

                        <span>

                            Baud Rate

                        </span>

                        <strong>

                            9600

                        </strong>

                    </div>


                    <div class="hardware-info-row">

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
    // Inicialização
    // =====================================

    init() {

        if (this.initialized) {

            return;

        }


        this.initialized = true;


        this.registerEvents();

    }


    // =====================================
    // Eventos
    // =====================================

    registerEvents() {

        const connectButton =
            document.getElementById(
                "hardware-connect"
            );


        const disconnectButton =
            document.getElementById(
                "hardware-disconnect"
            );


        if (connectButton) {

            connectButton.addEventListener(

                "click",

                () => {

                    this.connect();

                }

            );

        }


        if (disconnectButton) {

            disconnectButton.addEventListener(

                "click",

                () => {

                    this.disconnect();

                }

            );

        }

    }


    // =====================================
    // Conectar
    // =====================================

    connect() {

        this.setConnectionState(true);

    }


    // =====================================
    // Desconectar
    // =====================================

    disconnect() {

        this.setConnectionState(false);

    }


    // =====================================
    // Estado da conexão
    // =====================================

    setConnectionState(connected) {

        this.connected =
            connected === true;


        const status =
            document.getElementById(
                "hardware-page-status"
            );


        const indicator =
            document.getElementById(
                "hardware-page-indicator"
            );


        const connectButton =
            document.getElementById(
                "hardware-connect"
            );


        const disconnectButton =
            document.getElementById(
                "hardware-disconnect"
            );


        if (status) {

            status.textContent =
                this.connected
                    ? "Conectado"
                    : "Desconectado";

        }


        if (indicator) {

            indicator.classList.toggle(

                "connected",

                this.connected

            );

        }


        if (connectButton) {

            connectButton.disabled =
                this.connected;

        }


        if (disconnectButton) {

            disconnectButton.disabled =
                !this.connected;

        }

    }


    // =====================================
    // Destruição
    // =====================================

    destroy() {

        this.initialized = false;

    }

}


module.exports = HardwarePage;