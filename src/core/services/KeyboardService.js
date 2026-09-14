const {
    keyboard,
    Key
} = require("@nut-tree-fork/nut-js");


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


    // =====================================
    // Executar atalho
    // =====================================

    async execute(shortcut) {

        if (!shortcut) {
            return false;
        }


        const keys =
            String(shortcut)
                .split("+")
                .map(
                    key =>
                        key.trim().toUpperCase()
                )
                .filter(Boolean);


        if (keys.length === 0) {
            return false;
        }


        const nutKeys = [];


        try {

            // =================================
            // Resolve todas as teclas primeiro
            // =================================

            for (const key of keys) {

                nutKeys.push(
                    this.resolveKey(key)
                );
            }


            // =================================
            // Pressiona
            // =================================

            await keyboard.pressKey(
                ...nutKeys
            );


            // =================================
            // Libera na ordem inversa
            // =================================

            await keyboard.releaseKey(
                ...[...nutKeys].reverse()
            );


            console.log(
                `[KRONOS] Atalho executado: ${shortcut}`
            );


            return true;

        }
        catch (error) {

            console.error(
                `[KRONOS] Erro ao executar atalho "${shortcut}":`,
                error
            );


            return false;
        }
    }


    // =====================================
    // Resolver tecla
    // =====================================

    resolveKey(key) {

        if (!key) {

            throw new Error(
                "Tecla vazia."
            );
        }


        // =================================
        // Teclas especiais
        // =================================

        if (this.keyMap[key]) {

            return this.keyMap[key];
        }


        // =================================
        // Teclas de função
        // =================================

        if (/^F([1-9]|1[0-2])$/.test(key)) {

            const functionKey =
                Key[key];

            if (functionKey) {
                return functionKey;
            }
        }


        // =================================
        // Teclas simples
        // =================================

        if (key.length === 1) {

            const simpleKey =
                Key[key];

            if (simpleKey) {
                return simpleKey;
            }
        }


        throw new Error(
            `Tecla não suportada: ${key}`
        );
    }
}


module.exports =
    new KeyboardService();