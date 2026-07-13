import Sidebar from "../components/Sidebar/Sidebar.js";
import PageManager from "./PageManager.js";

export default class App {

    constructor() {

        this.sidebar = new Sidebar();

        this.pageManager = new PageManager();

        console.log("KRONOS iniciado.");

    }

    render() {

        return `

            <div class="layout">

                ${this.sidebar.render()}

                ${this.pageManager.getCurrentPage().render()}

            </div>

        `;

    }

}