import LightroomService from "./LightroomService.js";

export default class ActionDispatcher {

    constructor() {

        this.lightroom = new LightroomService();

    }

    dispatch(control) {

        if (!control) {

            return false;

        }

        if (!control.command) {

            console.warn(

                `Controle "${control.id}" não possui comando.`

            );

            return false;

        }

        return this.lightroom.execute(

            control.command

        );

    }

}