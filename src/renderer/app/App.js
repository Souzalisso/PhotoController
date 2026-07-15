import Sidebar from "../components/sidebar/Sidebar.js";
import PageManager from "./PageManager.js";

export default class App {

    constructor() {

        this.sidebar = new Sidebar();

        this.pageManager = new PageManager();

    }

    render() {

        return `

        <div class="layout">

            ${this.sidebar.render()}

            <div id="page-content">

                ${this.pageManager.getCurrentPage().render()}

            </div>

        </div>

        `;

    }

    init() {

        this.sidebar.init();

        this.pageManager.getCurrentPage().init();

        document.addEventListener("change-page", (event) => {

            this.changePage(event.detail);

        });

    }

    changePage(page) {

        this.pageManager.setCurrentPage(page);

        const container = document.getElementById("page-content");

        container.innerHTML = this.pageManager.getCurrentPage().render();

        this.pageManager.getCurrentPage().init();

    }

}