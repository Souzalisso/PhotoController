import KronosControls from "../designer/KronosControls.js";

export default class HardwareMapper {

    map(event) {

        if (!event) {

            return null;

        }

        const control = KronosControls.findByHardware(

            event.type,

            event.id

        );

        if (!control) {

            console.warn(

                `Hardware não mapeado: ${event.type} ${event.id}`

            );

            return null;

        }

        return {

            controlId: control.id,

            controlType: control.type,

            hardware: control.hardware,

            value: event.value,

            raw: event

        };

    }

}