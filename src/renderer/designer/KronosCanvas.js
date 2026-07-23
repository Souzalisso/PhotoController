import KronosControls from "./KronosControls.js";
import KronosRenderer from "./KronosRenderer.js";

export default class KronosCanvas {

    constructor(controlManager) {

        this.controlManager = controlManager;
        this.renderer = new KronosRenderer();

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

                ${KronosControls.left
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

                ${KronosControls.right
                    .map(control => this.renderControl(control))
                    .join("")}

            </div>

        `;

    }

    renderTopEncoders() {

        return `

            <div class="encoder-row">

                ${KronosControls.top
                    .map(control => this.renderControl(control))
                    .join("")}

            </div>

        `;

    }

    renderBottomEncoders() {

        return `

            <div class="encoder-row">

                ${KronosControls.bottom
                    .map(control => this.renderControl(control))
                    .join("")}

            </div>

        `;

    }

    renderDisplayArea() {

        return `

            <div class="display-area">

                ${this.renderControl(
                    KronosControls.center.display
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

    renderNavigationSection() {

        return `

            <div class="navigation-section">

                ${this.renderControl(
                    KronosControls.center.leftEncoder
                )}

                ${this.renderControl(
                    KronosControls.center.mainEncoder
                )}

                ${this.renderControl(
                    KronosControls.center.rightEncoder
                )}

            </div>

        `;

    }

    renderStarsSection() {

        return `

            <div class="stars-section">

                ${KronosControls.stars
                    .map(control => this.renderControl(control))
                    .join("")}

            </div>

        `;

    }

    renderActionsSection() {

        return `

            <div class="actions-section">

                ${KronosControls.actions
                    .map(control => this.renderControl(control))
                    .join("")}

            </div>

        `;

    }

    renderControl(control) {

        if (!control) {

            return "";

        }

        return this.renderer.render(control);

    }
        init(container = document) {

        this.bindEvents(container);

        this.updateSelection(container);

    }

    bindEvents(container) {

        container
            .querySelectorAll("[data-id]")
            .forEach(element => {

                element.addEventListener("click", () => {

                    this.selectControl(element.dataset.id, container);

                });

            });

    }

    selectControl(id, container = document) {

        if (this.controlManager?.select) {

            this.controlManager.select(id);

        }

        this.updateSelection(container);

    }

    updateSelection(container = document) {

        container
            .querySelectorAll("[data-id]")
            .forEach(element => {

                element.classList.remove("selected");

            });

        const selectedId = this.controlManager?.getSelected?.();

        if (!selectedId) {

            return;

        }

        const selected = container.querySelector(

            `[data-id="${selectedId}"]`

        );

        if (selected) {

            selected.classList.add("selected");

        }

    }

    setControlActive(id, active = true) {

        const element = document.querySelector(

            `[data-id="${id}"]`

        );

        if (!element) {

            return;

        }

        element.classList.toggle("active", active);

    }

    setConnected(connected) {

        const panel = document.querySelector(

            ".kronos-panel"

        );

        if (!panel) {

            return;

        }

        panel.classList.toggle(

            "connected",

            connected

        );

    }

    updateDisplay(title, value, status = "") {

        const titleElement = document.querySelector(

            "#oled-line-1"

        );

        const valueElement = document.querySelector(

            "#oled-line-2"

        );

        const statusElement = document.querySelector(

            "#oled-line-3"

        );

        if (titleElement) {

            titleElement.textContent = title;

        }

        if (valueElement) {

            valueElement.textContent = value;

        }

        if (statusElement) {

            statusElement.textContent = status;

        }

    }

    clearDisplay() {

        this.updateDisplay("", "", "");

    }

    getSelectedControl() {

        const id = this.controlManager?.getSelected?.();

        if (!id) {

            return null;

        }

        return KronosControls.findById(id);

    }

    refresh(container = document) {

        this.updateSelection(container);

    }