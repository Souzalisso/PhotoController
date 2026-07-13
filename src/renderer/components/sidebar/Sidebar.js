export default class Sidebar {

    render() {

        return `

        <aside class="sidebar">

            <div class="logo">

                <h1>KRONOS</h1>
                <span>Controller</span>

            </div>

            <nav>

                <button class="menu active" data-page="dashboard">
                    🏠 Início
                </button>

                <button class="menu" data-page="controls">
                    🎛 Controles
                </button>

                <button class="menu" data-page="hardware">
                    ⚙ Hardware
                </button>

                <button class="menu" data-page="display">
                    🖥 Display
                </button>

                <button class="menu" data-page="shortcuts">
                    ⌨ Atalhos
                </button>

                <button class="menu" data-page="about">
                    ℹ Sobre
                </button>

            </nav>

        </aside>

        `;

    }

    init() {

        document.querySelectorAll(".menu").forEach(button => {

            button.addEventListener("click", () => {

                document.querySelectorAll(".menu").forEach(btn => {

                    btn.classList.remove("active");

                });

                button.classList.add("active");

                console.log(button.dataset.page);

            });

        });

    }

}