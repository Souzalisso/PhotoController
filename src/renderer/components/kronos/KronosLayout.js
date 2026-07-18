import KronosControls from "./KronosControls.js";
import KronosRenderer from "./KronosRenderer.js";

export default class KronosLayout {

    constructor(){

        this.renderer = new KronosRenderer();

    }

    render(){

        return `

            <div class="kronos-layout">

                ${KronosControls
                    .map(control => this.renderer.render(control))
                    .join("")}

            </div>

        `;

    }

}