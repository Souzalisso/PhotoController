import Sidebar from "../components/sidebar/Sidebar.js";
import PageManager from "./PageManager.js";

export default class App {

    constructor() {

        this.pageManager = new PageManager();

        this.sidebar = new Sidebar();

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

    }

}