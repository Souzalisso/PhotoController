import DashboardPage from "../pages/Dashboard/DashboardPage.js";
import ControlsPage from "../pages/Controls/ControlsPage.js";
import HardwarePage from "../pages/Hardware/HardwarePage.js";
import DisplayPage from "../pages/Display/DisplayPage.js";
import LightroomPage from "../pages/Lightroom/LightroomPage.js";
import AboutPage from "../pages/About/AboutPage.js";

export default class PageManager {

    constructor() {

        this.pages = {
            dashboard: new DashboardPage(),
            controls: new ControlsPage(),
            hardware: new HardwarePage(),
            display: new DisplayPage(),
            lightroom: new LightroomPage(),
            shortcuts: new ShortcutsPage(),
            about: new AboutPage()
        };

        this.currentPage = "dashboard";

    }

    getCurrentPage() {

        return this.pages[this.currentPage];

    }

    setCurrentPage(page) {

        if (this.pages[page]) {

            this.currentPage = page;

        }

    }

    render() {

        return this.getCurrentPage().render();

    }

}