export default class HardwarePage {

    render() {

        return `

        <main class="content">

            <h1>Hardware</h1>

            <div class="card">

                <h2>Simulador</h2>

                <p>
                    Clique em um botão para simular um evento do Arduino.
                </p>

                <div class="sim-buttons">

                    <button class="sim-btn" data-id="1">BTN 1</button>
                    <button class="sim-btn" data-id="2">BTN 2</button>
                    <button class="sim-btn" data-id="3">BTN 3</button>
                    <button class="sim-btn" data-id="4">BTN 4</button>

                    <button class="sim-btn" data-id="5">BTN 5</button>
                    <button class="sim-btn" data-id="6">BTN 6</button>
                    <button class="sim-btn" data-id="7">BTN 7</button>
                    <button class="sim-btn" data-id="8">BTN 8</button>

                </div>

            </div>

        </main>

        `;

    }

    init() {

        document.querySelectorAll(".sim-btn").forEach(button => {

            button.addEventListener("click", async () => {

                await window.photoController.simulateButton(

                    Number(button.dataset.id)

                );

            });

        });

    }

}