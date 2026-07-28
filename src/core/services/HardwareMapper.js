const KronosControls = require("../../renderer/designer/KronosControls");

class HardwareMapper {

    constructor() {

        this.controls = KronosControls.all;

    }

    map(event) {

        if (!event) {

            return null;

        }

        const control = KronosControls.findByHardware(

            event.type,

            event.id

        );

        if (!control) {

            return null;

        }

        return {

            id: control.id,

            label: control.label,

            type: control.type,

            configurable: control.configurable,

            hardware: control.hardware,

            value: event.value,

            raw: event

        };

    }

    getControl(type, id) {

        return KronosControls.findByHardware(

            type,

            id

        );

    }

    exists(type, id) {

        return this.getControl(

            type,

            id

        ) !== null;

    }

    getAllControls() {

        return this.controls;

    }

    getButtons() {

        return this.controls.filter(

            control => control.type === "button"

        );

    }

    getEncoders() {

        return this.controls.filter(

            control => control.type === "encoder"

        );

    }

    getDisplays() {

        return this.controls.filter(

            control => control.type === "display"

        );

    }

}

module.exports = new HardwareMapper();