import KronosControls from "./KronosControls.js";

export default class KronosCanvas {

    constructor(controlManager) {

        this.controlManager = controlManager;

    }

    render() {

        return `

            <div class="kronos">

                ${this.renderPanel()}

            </div>

        `;

    }

    renderPanel() {

        return `

            <div class="kronos-panel">

                ${this.renderLeftColumn()}

                ${this.renderCenter()}

                ${this.renderRightColumn()}

            </div>

        `;

    }

    renderLeftColumn() {

        return `

            <div class="left-column">

                ${this.getGroup("left")
                    .map(control => this.renderControl(control))
                    .join("")}

            </div>

        `;

    }

    renderCenter() {

        return `

            <div class="center-panel">

                ${this.renderTopEncoders()}

                ${this.renderDisplayArea()}

                ${this.renderBottomEncoders()}

                ${this.renderBottomArea()}

            </div>

        `;

    }

    renderRightColumn() {

        return `

            <div class="right-column">

                ${this.getGroup("right")
                    .map(control => this.renderControl(control))
                    .join("")}

            </div>

        `;

    }

    renderTopEncoders() {

        const controls = [

            "exposure",
            "contrast",
            "highlights",
            "shadows",
            "whites"

        ];

        return `

            <div class="encoder-row">

                ${controls.map(id =>

                    this.renderControl(

                        this.getControl(id)

                    )

                ).join("")}

            </div>

        `;

    }

    renderBottomEncoders() {

        const controls = [

            "blacks",
            "temperature",
            "tint",
            "vibrance",
            "saturation"

        ];

        return `

            <div class="encoder-row">

                ${controls.map(id =>

                    this.renderControl(

                        this.getControl(id)

                    )

                ).join("")}

            </div>

        `;

    }

    renderDisplayArea() {

        return `

            <div class="display-area">

                ${this.renderControl(

                    this.getControl("display")

                )}

            </div>

        `;

    }

    renderBottomArea() {

        return `

            <div class="bottom-area">

                ${this.renderNavigationSection()}

                ${this.renderStarsSection()}

                ${this.renderActionsSection()}

            </div>

        `;

    }

    getControl(id) {

        return KronosControls.find(

            control => control.id === id

        );

    }

    getGroup(group) {

        return KronosControls.filter(

            control => control.group === group

        );

    }

    renderControl(control) {

        if (!control) return "";

        switch (control.type) {

            case "button":

                return this.renderButton(control);

            case "encoder":

                return this.renderEncoder(control);

            case "smallEncoder":

                return this.renderSmallEncoder(control);

            case "display":

                return this.renderDisplay(control);

            case "navigation":

                return this.renderNavigation(control);

            case "star":

                return this.renderStar(control);

            case "pick":

                return this.renderPick(control);

            case "reject":

                return this.renderReject(control);

            case "arrow":

                return this.renderArrow(control);

            default:

                return "";

        }

    }

        renderButton(control) {

        const selected = this.controlManager?.isSelected?.(control.id)
            ? "selected"
            : "";

        return `

            <button
                class="kronos-button ${selected}"
                data-id="${control.id}">

                <span class="button-led"></span>

                <span class="button-text">

                    ${control.text.replace("\n", "<br>")}

                </span>

            </button>

        `;

    }

    renderEncoder(control) {

        const selected = this.controlManager?.isSelected?.(control.id)
            ? "selected"
            : "";

        return `

            <div
                class="encoder ${selected}"
                data-id="${control.id}">

                <div class="encoder-ring">

                    <div
                        class="encoder-led"
                        style="background:${control.color};">
                    </div>

                    <div class="encoder-cap"></div>

                    <div class="encoder-marker"></div>

                </div>

                <div class="encoder-label">

                    ${control.label}

                </div>

            </div>

        `;

    }

    renderSmallEncoder(control) {

        const selected = this.controlManager?.isSelected?.(control.id)
            ? "selected"
            : "";

        return `

            <div
                class="small-encoder ${selected}"
                data-id="${control.id}">

                <div class="encoder-ring">

                    <div class="encoder-cap"></div>

                    <div class="encoder-marker"></div>

                </div>

                <span>

                    ${control.label}

                </span>

            </div>

        `;

    }

    renderDisplay() {

        return `

            <div
                class="oled-display"
                data-id="display">

                <div class="oled-header">

                    KRONOS

                </div>

                <div class="oled-body">

                    <div class="oled-title">

                        Lightroom

                    </div>

                    <div class="oled-value">

                        Ready

                    </div>

                </div>

            </div>

        `;

    }

    renderNavigation() {

        return `

            <div
                class="navigation-encoder"
                data-id="navigation">

                <div class="encoder-ring">

                    <div class="encoder-cap"></div>

                    <div class="encoder-marker"></div>

                </div>

                <span>

                    NAV

                </span>

            </div>

        `;

    }
}