export default class HardwarePage {

    render() {

        return `

        <main class="content">

            <h1>Hardware</h1>

            <div class="card">

                <h2>Status</h2>

                <p id="hardwareStatus">

                    Desconectado

                </p>

            </div>

            <div class="card">

                <h2>Porta</h2>

                <p id="hardwarePort">

                    --

                </p>

            </div>

            <div class="card">

                <h2>Último Evento</h2>

                <p id="hardwareLastEvent">

                    Nenhum

                </p>

            </div>

        </main>

        `;

    }

    init() {

        console.log("Hardware carregado.");

    }

}