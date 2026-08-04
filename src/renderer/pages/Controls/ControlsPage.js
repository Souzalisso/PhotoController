class ControlsPage {

    constructor() {

        this.designer = new KronosDesigner();

    }

    render() {

        return this.designer.render();

    }

    async init() {

        await this.designer.init();

    }

}
