const KronosDesigner =
    require("../../designer/KronosDesigner");


class ControlsPage {

    constructor() {

        this.designer =
            new KronosDesigner();
    }


    // =====================================
    // Renderização
    // =====================================

    render() {

        if (!this.designer) {

            this.designer =
                new KronosDesigner();
        }

        return this.designer.render();
    }


    // =====================================
    // Inicialização
    // =====================================

    async init() {

        if (!this.designer) {

            this.designer =
                new KronosDesigner();
        }

        await this.designer.init();
    }


    // =====================================
    // Destruição
    // =====================================

    destroy() {

        if (
            this.designer &&
            typeof this.designer.destroy === "function"
        ) {

            this.designer.destroy();
        }

        this.designer = null;
    }
}


module.exports = ControlsPage;