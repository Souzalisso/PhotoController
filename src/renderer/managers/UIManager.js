export default class UIManager {

    constructor() {

        this.selectedControl = null;

    }

    initialize() {

        this.bindControls();

    }

    bindControls() {

        const controls = document.querySelectorAll("[data-control-id]");

        controls.forEach(control => {

            control.addEventListener("click", () => {

                this.selectControl(control.dataset.controlId);

            });

        });

    }

    selectControl(id) {

        document
            .querySelectorAll(".selected")
            .forEach(element => {

                element.classList.remove("selected");

            });

        const control = document.querySelector(

            `[data-control-id="${id}"]`

        );

        if (!control) {

            return;

        }

        control.classList.add("selected");

        this.selectedControl = id;

        console.log("Controle selecionado:", id);

    }

    getSelectedControl() {

        return this.selectedControl;

    }

    clearSelection() {

        document
            .querySelectorAll(".selected")
            .forEach(element => {

                element.classList.remove("selected");

            });

        this.selectedControl = null;

    }

    setControlActive(id, active = true) {

        const control = document.querySelector(

            `[data-control-id="${id}"]`

        );

        if (!control) {

            return;

        }

        control.classList.toggle("active", active);

    }

    updateDisplay(title, value) {

        const titleElement = document.querySelector(".oled-title");

        const valueElement = document.querySelector(".oled-value");

        if (titleElement) {

            titleElement.textContent = title;

        }

        if (valueElement) {

            valueElement.textContent = value;

            valueElement.classList.add("update");

            setTimeout(() => {

                valueElement.classList.remove("update");

            }, 180);

        }

    }

    setHardwareConnected(connected) {

        const display = document.querySelector(".oled-display");

        if (!display) {

            return;

        }

        display.classList.toggle("connected", connected);

        display.classList.toggle("disconnected", !connected);

    }

}