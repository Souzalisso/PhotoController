import Sidebar from "../components/Sidebar.js";
import DashboardPage from "../pages/DashboardPage.js";

export default class App {

    constructor() {

        this.sidebar = new Sidebar();

        this.dashboard = new DashboardPage();

        console.log("KRONOS iniciado.");

    }

    render() {

        return `

        <div class="layout">

            ${this.sidebar.render()}

            ${this.dashboard.render()}

        </div>

        `;

    }

}