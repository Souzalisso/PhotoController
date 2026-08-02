const KronosDesigner = require("../../designer/KronosDesigner");

class DashboardPage {

    constructor() {

        this.designer = new KronosDesigner();

    }

    render() {

        return `

            <main class="dashboard-page">

                ${this.designer.render()}

            </main>

        `;

    }

    async init() {

        await this.designer.init();

    }

}

module.exports = DashboardPage;