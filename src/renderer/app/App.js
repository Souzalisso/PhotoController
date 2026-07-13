import Sidebar from "../components/sidebar/Sidebar.js";
import DashboardPage from "../pages/Dashboard/DashboardPage.js";

export default class App {

    constructor() {

        this.sidebar = new Sidebar();
        this.dashboard = new DashboardPage();

    }

    render() {

        return `

        <div class="layout">

            ${this.sidebar.render()}

            ${this.dashboard.render()}

        </div>

        `;

    }

    init() {

        this.sidebar.init();

    }

}