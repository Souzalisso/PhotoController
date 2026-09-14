const fs = require("fs");
const path = require("path");
const { app } = require("electron");


class ConfigurationManager {

    constructor() {

        this.fileName =
            "kronos-configuration.json";

        this.controls = {};
    }


    getFilePath() {

        return path.join(
            app.getPath("userData"),
            this.fileName
        );
    }


    async load() {

        try {

            const filePath =
                this.getFilePath();


            if (!fs.existsSync(filePath)) {

                this.controls = {};

                return;
            }


            const json =
                await fs.promises.readFile(
                    filePath,
                    "utf8"
                );


            this.controls =
                json
                    ? JSON.parse(json)
                    : {};
        }

        catch (error) {

            console.error(
                "[KRONOS] Erro ao carregar configuração:",
                error
            );

            this.controls = {};
        }
    }


    async save() {

        try {

            const filePath =
                this.getFilePath();

            const directory =
                path.dirname(filePath);


            await fs.promises.mkdir(
                directory,
                {
                    recursive: true
                }
            );


            await fs.promises.writeFile(
                filePath,
                JSON.stringify(
                    this.controls,
                    null,
                    4
                ),
                "utf8"
            );
        }

        catch (error) {

            console.error(
                "[KRONOS] Erro ao salvar configuração:",
                error
            );
        }
    }


    // =====================================
    // Comando normal
    // =====================================

    get(controlId) {

        return (
            this.controls[controlId] ||
            null
        );
    }


    set(controlId, commandId) {

        this.controls[controlId] =
            commandId;
    }


    // =====================================
    // Encoder - horário
    // =====================================

    getClockwiseCommand(controlId) {

        const configuration =
            this.controls[controlId];


        if (
            !configuration ||
            typeof configuration !== "object"
        ) {

            return null;
        }


        return (
            configuration.clockwise ||
            null
        );
    }


    setClockwiseCommand(
        controlId,
        commandId
    ) {

        if (
            !this.controls[controlId] ||
            typeof this.controls[controlId] !== "object"
        ) {

            this.controls[controlId] = {};
        }


        this.controls[controlId].clockwise =
            commandId || null;
    }


    // =====================================
    // Encoder - anti-horário
    // =====================================

    getCounterClockwiseCommand(controlId) {

        const configuration =
            this.controls[controlId];


        if (
            !configuration ||
            typeof configuration !== "object"
        ) {

            return null;
        }


        return (
            configuration.counterClockwise ||
            null
        );
    }


    setCounterClockwiseCommand(
        controlId,
        commandId
    ) {

        if (
            !this.controls[controlId] ||
            typeof this.controls[controlId] !== "object"
        ) {

            this.controls[controlId] = {};
        }


        this.controls[controlId].counterClockwise =
            commandId || null;
    }


    // =====================================
    // Verificação
    // =====================================

    has(controlId) {

        return (
            controlId in
            this.controls
        );
    }


    remove(controlId) {

        delete this.controls[controlId];
    }


    getAll() {

        return {
            ...this.controls
        };
    }


    // =====================================
    // Reset
    // =====================================

    async reset() {

        this.controls = {};

        try {

            const filePath =
                this.getFilePath();


            if (fs.existsSync(filePath)) {

                await fs.promises.unlink(
                    filePath
                );
            }
        }

        catch (error) {

            console.error(
                "[KRONOS] Erro ao resetar configuração:",
                error
            );
        }
    }
}


module.exports = ConfigurationManager;