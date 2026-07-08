export default class DashboardPage {

    render() {

        return `

        <main class="content">

            <h1>Dashboard</h1>

            <div class="card">

                <h2>Hardware</h2>

                <p id="hardwareStatus">

                    Desconectado

                </p>

            </div>

            <div class="card">

                <h2>Último Evento</h2>

                <p id="lastEvent">

                    Nenhum evento

                </p>

            </div>

        </main>

        `;

    }

}