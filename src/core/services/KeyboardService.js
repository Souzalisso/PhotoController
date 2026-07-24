export default class KeyboardService {

    constructor() {

        this.enabled = true;

    }

    enable() {

        this.enabled = true;

    }

    disable() {

        this.enabled = false;

    }

    isEnabled() {

        return this.enabled;

    }

    execute(shortcut) {

        if (!this.enabled) {

            return false;

        }

        if (!shortcut) {

            return false;

        }

        console.group("KEYBOARD");

        console.log("Shortcut:", shortcut);

        console.groupEnd();

        /*
         *
         * Aqui ficará a integração com o Electron.
         *
         * Exemplos:
         *
         * window.electron.keyboard.send(shortcut);
         *
         * ou
         *
         * ipcRenderer.invoke(...)
         *
         */

        return true;

    }

}