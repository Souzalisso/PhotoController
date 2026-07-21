import KronosDesigner from "../designer/KronosDesigner.js";

export default class ControlsPage {

    render() {

        const designer = new KronosDesigner();

        return designer.render();

    }

    init() {

        const designer = new KronosDesigner();

        designer.init();

    }

}