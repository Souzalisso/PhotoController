import KronosControls from "../designer/KronosControls.js";

export default class ControlManager {

    constructor() {

        this.controls = new Map();

    }

    async load() {

        this.controls.clear();

        const savedControls = {};

        KronosControls.all.forEach(control => {

            const saved = savedControls?.[control.id] || {};

            this.controls.set(control.id, {

                ...control,

                command: saved.command || "",

                value: saved.value ?? 0,

                active: false,

                selected: false

            });

        });

    }

    getAll() {

        return [...this.controls.values()];

    }

    get(id) {

        return this.controls.get(id);

    }

    exists(id) {

        return this.controls.has(id);

    }

    select(id) {

        this.controls.forEach(control => {

            control.selected = false;

        });

        const control = this.get(id);

        if (control) {

            control.selected = true;

        }

    }

    getSelected() {

        for (const control of this.controls.values()) {

            if (control.selected) {

                return control.id;

            }

        }

        return null;

    }

    isSelected(id) {

        return this.getSelected() === id;

    }

    setActive(id, active = true) {

        const control = this.get(id);

        if (!control) return;

        control.active = active;

    }

    isActive(id) {

        return this.get(id)?.active ?? false;

    }

    setCommand(id, command) {

        const control = this.get(id);

        if (!control) return;

        control.command = command;

    }

    getCommand(id) {

        return this.get(id)?.command || "";

    }

    setValue(id, value) {

        const control = this.get(id);

        if (!control) return;

        control.value = value;

    }

    getValue(id) {

        return this.get(id)?.value ?? 0;

    }

    async save() {

        const data = {};

        this.controls.forEach(control => {

            data[control.id] = {

                command: control.command,

                value: control.value

            };

        });

        console.log("Configurações:", data);

    }

    reset() {

        this.controls.forEach(control => {

            control.command = "";

            control.value = 0;

            control.selected = false;

            control.active = false;

        });

    }

}