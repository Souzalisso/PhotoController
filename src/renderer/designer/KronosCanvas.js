import KronosControls from "./KronosControls.js";
import KronosTheme from "./KronosTheme.js";

export default class KronosCanvas {

    render() {

        return `

            <div class="kronos-panel">

                <div class="kronos-left">

                    ${this.renderLeftButtons()}

                </div>

                <div class="kronos-center">

                    <div class="kronos-top-row">

                        ${this.renderTopEncoders()}

                    </div>

                    ${this.renderDisplay()}

                    <div class="kronos-middle-row">

                        ${this.renderBottomEncoders()}

                    </div>

                    <div class="kronos-lower-row">

                        ${this.renderLowerEncoders()}

                    </div>

                    <div class="kronos-footer">

                        ${this.renderStars()}

                        ${this.renderActions()}

                        ${this.renderNavigation()}

                    </div>

                </div>

            </div>

        `;

    }

    renderLeftButtons() {

        return KronosControls.leftButtons
            .map(button => this.renderButton(button))
            .join("");

    }

    renderTopEncoders() {

        return KronosControls.topEncoders
            .map(encoder => this.renderEncoder(encoder))
            .join("");

    }

    renderBottomEncoders() {

        return KronosControls.bottomEncoders
            .map(encoder => this.renderEncoder(encoder))
            .join("");

    }

    renderLowerEncoders() {

        return KronosControls.lowerEncoders
            .map(encoder => this.renderLargeEncoder(encoder))
            .join("");

    }

    renderDisplay() {

        return `

            <div
                class="kronos-display kronos-control"
                data-id="${KronosControls.display.id}">

                <div class="display-title">

                    KRONOS

                </div>

                <div class="display-text">

                    Lightroom Ready

                </div>

            </div>

        `;

    }

    renderStars() {

        return `

            <div class="stars-container">

                ${KronosControls.stars.map(star => `

                    <div
                        class="kronos-star kronos-control"
                        data-id="${star.id}">

                        ★

                    </div>

                `).join("")}

            </div>

        `;

    }

    renderActions() {

        return `

            <div class="actions-container">

                ${KronosControls.actions
                    .map(button => this.renderButton(button))
                    .join("")}

            </div>

        `;

    }

    renderNavigation() {

        return `

            <div class="navigation-container">

                ${KronosControls.navigation
                    .map(button => this.renderButton(button))
                    .join("")}

            </div>

        `;

    }

    renderButton(button) {

        return `

            <div
                class="kronos-button kronos-control"
                data-id="${button.id}">

                ${button.label}

            </div>

        `;

    }

    renderEncoder(encoder) {

        return `

            <div
                class="encoder-container">

                <div
                    class="kronos-encoder kronos-control"
                    data-id="${encoder.id}">

                    <div class="encoder-indicator"></div>

                </div>

                <span>

                    ${encoder.label}

                </span>

            </div>

        `;

    }

    renderLargeEncoder(encoder) {

        return `

            <div
                class="large-encoder-container">

                <div
                    class="kronos-large-encoder kronos-control"
                    data-id="${encoder.id}">

                    <div class="encoder-indicator"></div>

                </div>

            </div>

        `;

    }

}