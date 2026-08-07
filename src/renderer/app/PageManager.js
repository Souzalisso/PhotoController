const DashboardPage =
    require("../pages/Dashboard/DashboardPage");

const ControlsPage =
    require("../pages/Controls/ControlsPage");

const HardwarePage =
    require("../pages/Hardware/HardwarePage");

const DisplayPage =
    require("../pages/Display/DisplayPage");

const LightroomPage =
    require("../pages/lightroom/LightroomPage");

const AboutPage =
    require("../pages/About/AboutPage");


class PageManager {

    constructor() {

        this.pages = {

            dashboard:
                new DashboardPage(),

            controls:
                new ControlsPage(),

            hardware:
                new HardwarePage(),

            display:
                new DisplayPage(),

            lightroom:
                new LightroomPage(),

            about:
                new AboutPage()

        };


        this.currentPage =
            "dashboard";

    }


    // =====================================
    // Página atual
    // =====================================

    getCurrentPage() {

        return this.pages[
            this.currentPage
        ];

    }


    // =====================================
    // Alterar página
    // =====================================

    setCurrentPage(page) {

        if (!this.pages[page]) {

            console.warn(

                `[KRONOS] Página não encontrada: ${page}`

            );

            return false;

        }


        if (
            page === this.currentPage
        ) {

            return true;

        }


        const previousPage =
            this.getCurrentPage();


        if (
            previousPage &&
            typeof previousPage.destroy === "function"
        ) {

            previousPage.destroy();

        }


        this.currentPage = page;


        return true;

    }


    // =====================================
    // Renderizar página atual
    // =====================================

    renderCurrentPage() {

        const container =
            document.getElementById(
                "page-content"
            );


        if (!container) {

            console.warn(

                "[KRONOS] Container #page-content não encontrado."

            );

            return;

        }


        const page =
            this.getCurrentPage();


        if (!page) {

            console.warn(

                "[KRONOS] Nenhuma página selecionada."

            );

            return;

        }


        container.innerHTML =
            page.render();


        page.init();

    }


    // =====================================
    // Verificar página
    // =====================================

    hasPage(page) {

        return Boolean(
            this.pages[page]
        );

    }


    // =====================================
    // Lista de páginas
    // =====================================

    getPages() {

        return Object.keys(
            this.pages
        );

    }


    // =====================================
    // Página atual ID
    // =====================================

    getCurrentPageId() {

        return this.currentPage;

    }


    // =====================================
    // Destruição
    // =====================================

    destroy() {

        const page =
            this.getCurrentPage();


        if (
            page &&
            typeof page.destroy === "function"
        ) {

            page.destroy();

        }


        this.pages = {};

        this.currentPage = null;

    }

}


module.exports = PageManager;