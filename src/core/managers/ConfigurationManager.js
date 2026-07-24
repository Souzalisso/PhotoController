import KronosControls from "../../renderer/designer/KronosControls.js";
import ConfigurationManager from "./ConfigurationManager.js";

export default class ConfigurationManager {

    constructor() {

        this.storageKey = "kronos-configuration";

        this.configuration = {};

    }

    async load() {

        try {

            const json = localStorage.getItem(

                this.storageKey

            );

            if (!json) {

                this.configuration = {};

                return this.configuration;

            }

            this.configuration = JSON.parse(json);

            return this.configuration;

        }

        catch (error) {

            console.error(

                "Erro ao carregar configuração:",

                error

            );

            this.configuration = {};

            return this.configuration;

        }

    }

    async save() {

        try {

            localStorage.setItem(

                this.storageKey,

                JSON.stringify(

                    this.configuration,

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

        return this.configuration[controlId] || null;

    }

    set(controlId, commandId) {

        this.configuration[controlId] = commandId;

    }

    has(controlId) {

        return Object.prototype.hasOwnProperty.call(

            this.configuration,

            controlId

        );

    }

    remove(controlId) {

        delete this.configuration[controlId];

    }

    clear() {

        this.configuration = {};

    }

    async reset() {

        this.clear();

        localStorage.removeItem(

            this.storageKey

        );

    }

}