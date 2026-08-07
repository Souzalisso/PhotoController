const KronosDesigner = require("../../designer/KronosDesigner");


class ControlsPage {

    constructor() {

        this.designer =
            new KronosDesigner();

    }


    // =====================================
    // Renderização
    // =====================================

    render() {

        return this.designer.render();

    }


    // =====================================
    // Inicialização
    // =====================================

    async init() {

        await this.designer.init();

    }


    // =====================================
    // Destruição
    // =====================================

    destroy() {

        if (this.designer) {

            this.designer.destroy();

        }

        this.designer = null;

    }

}


module.exports = ControlsPage;