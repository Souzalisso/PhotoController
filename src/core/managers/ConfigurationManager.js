class ConfigurationManager {

    constructor() {

        this.storageKey = "kronos-configuration";

        this.controls = {};

    }

    async load() {

        try {

            const json = localStorage.getItem(

                this.storageKey

            );

            if (!json) {

                this.controls = {};

                return;

            }

            this.controls = JSON.parse(json);

        }

        catch (error) {

            console.error(

                "Erro ao carregar configuração:",

                error

            );

            this.controls = {};

        }

    }

    async save() {

        try {

            localStorage.setItem(

                this.storageKey,

                JSON.stringify(

                    this.controls,

                    null,

                    4

                )

            );

        }

        catch (error) {

            console.error(

                "Erro ao salvar configuração:",

                error

            );

        }

    }

    get(controlId) {

        return this.controls[controlId] || null;

    }

    set(controlId, commandId) {

        this.controls[controlId] = commandId;

    }

    has(controlId) {

        return controlId in this.controls;

    }

    remove(controlId) {

        delete this.controls[controlId];

    }

    getAll() {

        return this.controls;

    }

    async reset() {

        this.controls = {};

        localStorage.removeItem(

            this.storageKey

        );

    }

}

module.exports = ConfigurationManager;