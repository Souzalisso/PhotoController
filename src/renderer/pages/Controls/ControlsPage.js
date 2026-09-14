const KronosDesigner =
    require("../../designer/KronosDesigner");

class ControlsPage {
    constructor() {
        this.designer =
            new KronosDesigner();
    }

    render() {
        if (!this.designer) {
            this.designer =
                new KronosDesigner();
        }

        return this.designer.render();
    }

    async init() {
        if (!this.designer) {
            this.designer =
                new KronosDesigner();
        }

        await this.designer.init();
    }

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