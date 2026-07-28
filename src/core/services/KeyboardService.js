const { keyboard, Key } = require("@nut-tree-fork/nut-js");

class KeyboardService {

    constructor() {

        this.keyMap = {

            CTRL: Key.LeftControl,
            SHIFT: Key.LeftShift,
            ALT: Key.LeftAlt,

            ENTER: Key.Enter,
            SPACE: Key.Space,
            TAB: Key.Tab,
            ESC: Key.Escape,
            DELETE: Key.Delete,
            BACKSPACE: Key.Backspace,

            ARROWLEFT: Key.Left,
            ARROWRIGHT: Key.Right,
            ARROWUP: Key.Up,
            ARROWDOWN: Key.Down

        };

    }

    async execute(shortcut) {

        if (!shortcut) {

            return;

        }

        const keys = shortcut
            .split("+")
            .map(key => key.trim().toUpperCase());

        const nutKeys = [];

        for (const key of keys) {

            nutKeys.push(

                this.resolveKey(key)

            );

        }

        await keyboard.pressKey(...nutKeys);

        await keyboard.releaseKey(...nutKeys.reverse());

    }

    resolveKey(key) {

        if (this.keyMap[key]) {

            return this.keyMap[key];

        }

        if (key.length === 1) {

            return Key[key.toUpperCase()];

        }

        throw new Error(

            `Tecla não suportada: ${key}`

        );

    }

}

module.exports = new KeyboardService();