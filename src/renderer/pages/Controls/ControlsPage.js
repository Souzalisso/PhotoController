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

        // Segurança adicional.
        // A página deve sempre possuir
        // um Designer válido.

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

        /*
         * IMPORTANTE:
         *
         * ControlsPage é mantida pelo PageManager
         * durante toda a execução da aplicação.
         *
         * Portanto não devemos destruir o Designer
         * ao simplesmente trocar de página.
         */

    }

}


module.exports = ControlsPage;