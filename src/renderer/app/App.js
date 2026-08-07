const Sidebar = require("../components/sidebar/Sidebar");
const PageManager = require("./PageManager");


class App {

    constructor() {

        this.sidebar = new Sidebar();

        this.pageManager = new PageManager();

    }


    // =====================================
    // Renderização
    // =====================================

    render() {

        return `

            <div class="layout">

                ${this.sidebar.render()}

                <div id="page-content">

                    ${this.pageManager
                        .getCurrentPage()
                        .render()}

                </div>

            </div>

        `;

    }


    // =====================================
    // Inicialização
    // =====================================

    init() {

        this.sidebar.init();

        this.pageManager
            .getCurrentPage()
            .init();


        document.addEventListener(

            "change-page",

            event => {

                this.changePage(
                    event.detail
                );

            }

        );

    }


    // =====================================
    // Troca de página
    // =====================================

    changePage(page) {

        this.pageManager
            .setCurrentPage(page);


        const container =
            document.getElementById(
                "page-content"
            );


        if (!container) {

            return;

        }


        const currentPage =
            this.pageManager
                .getCurrentPage();


        if (!currentPage) {

            return;

        }


        container.innerHTML =
            currentPage.render();


        currentPage.init();

    }


    // =====================================
    // Página atual
    // =====================================

    getCurrentPage() {

        return this.pageManager
            .getCurrentPage();

    }


    // =====================================
    // Destruição
    // =====================================

    destroy() {

        const currentPage =
            this.pageManager
                .getCurrentPage();


        if (
            currentPage &&
            typeof currentPage.destroy === "function"
        ) {

            currentPage.destroy();

        }


        if (
            this.sidebar &&
            typeof this.sidebar.destroy === "function"
        ) {

            this.sidebar.destroy();

        }


        this.sidebar = null;

        this.pageManager = null;

    }

}


module.exports = App;