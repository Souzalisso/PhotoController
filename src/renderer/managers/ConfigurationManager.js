export default class ConfigurationManager {

    constructor() {

        this.storageKey = "kronos-config";

    }

    async load() {

        try {

            const json = localStorage.getItem(
                this.storageKey
            );

            if (!json) {

                return {};

            }

            return JSON.parse(json);

        }

        catch (error) {

            console.error(
                "Erro ao carregar configuração:",
                error
            );

            return {};

        }

    }

    async save(configuration) {

        try {

            localStorage.setItem(

                this.storageKey,

                JSON.stringify(
                    configuration,
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

    async reset() {

        try {

            localStorage.removeItem(
                this.storageKey
            );

        }

        catch (error) {

            console.error(
                "Erro ao resetar configuração:",
                error
            );

        }

    }

    async exists() {

        return localStorage.getItem(
            this.storageKey
        ) !== null;

    }

}