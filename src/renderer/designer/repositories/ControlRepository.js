const Control = require("../models/Control");

const left = require("../controls/left");
const top = require("../controls/top");
const bottom = require("../controls/bottom");
const center = require("../controls/center");
const right = require("../controls/right");
const stars = require("../controls/stars");
const actions = require("../controls/actions");


class ControlRepository {

    constructor() {

        this.controls = [];

        this.load();

    }


    // =====================================
    // Carregamento
    // =====================================

    load() {

        const definitions = [

            ...left,

            ...top,

            ...bottom,

            center.display,

            center.leftEncoder,

            center.mainEncoder,

            center.rightEncoder,

            ...right,

            ...stars,

            ...actions

        ];


        this.controls = definitions.map(

            definition => new Control(definition)

        );


        this.validate();


        return this.controls;

    }


    // =====================================
    // Validação
    // =====================================

    validate() {

        const ids = new Set();

        const hardware = new Set();


        for (const control of this.controls) {

            // -----------------------------
            // ID
            // -----------------------------

            if (!control.id) {

                throw new Error(
                    "Controle encontrado sem ID."
                );

            }


            if (ids.has(control.id)) {

                throw new Error(
                    `Controle duplicado: ${control.id}`
                );

            }


            ids.add(control.id);


            // -----------------------------
            // Hardware
            // -----------------------------

            if (control.hardware) {

                if (
                    !control.hardware.type ||
                    control.hardware.id === undefined
                ) {

                    throw new Error(

                        `Hardware inválido no controle: ${control.id}`

                    );

                }


                const key =
                    `${control.hardware.type}-${control.hardware.id}`;


                if (hardware.has(key)) {

                    throw new Error(

                        `Hardware duplicado: ${key}`

                    );

                }


                hardware.add(key);

            }

        }


        return true;

    }


    // =====================================
    // Buscar por ID
    // =====================================

    findById(id) {

        return this.controls.find(

            control => control.id === id

        ) || null;

    }


    // =====================================
    // Buscar por Hardware
    // =====================================

    findByHardware(type, id) {

        return this.controls.find(

            control =>

                control.hardware?.type === type &&

                control.hardware?.id === id

        ) || null;

    }


    // =====================================
    // Todos os controles
    // =====================================

    getAll() {

        return [...this.controls];

    }


    // =====================================
    // Botões
    // =====================================

    getButtons() {

        return this.controls.filter(

            control => control.isButton()

        );

    }


    // =====================================
    // Encoders
    // =====================================

    getEncoders() {

        return this.controls.filter(

            control => control.isEncoder()

        );

    }


    // =====================================
    // Displays
    // =====================================

    getDisplays() {

        return this.controls.filter(

            control => control.isDisplay()

        );

    }


    // =====================================
    // Controles configuráveis
    // =====================================

    getConfigurable() {

        return this.controls.filter(

            control => control.configurable

        );

    }


    // =====================================
    // Controles com LED
    // =====================================

    getWithLed() {

        return this.controls.filter(

            control => control.supportsLed()

        );

    }


    // =====================================
    // Controles selecionados
    // =====================================

    getSelected() {

        return this.controls.filter(

            control => control.isSelected()

        );

    }


    // =====================================
    // Selecionar controle
    // =====================================

    select(id) {

        const control = this.findById(id);


        if (!control) {

            return null;

        }


        this.clearSelection();

        control.select();


        return control;

    }


    // =====================================
    // Limpar seleção
    // =====================================

    clearSelection() {

        for (const control of this.controls) {

            control.unselect();

        }

    }


    // =====================================
    // Comandos Lightroom
    // =====================================

    setCommand(id, command) {

        const control = this.findById(id);


        if (!control) {

            throw new Error(

                `Controle não encontrado: ${id}`

            );

        }


        if (!control.configurable) {

            throw new Error(

                `Controle não configurável: ${id}`

            );

        }


        control.setCommand(command);


        return control;

    }


    getCommand(id) {

        const control = this.findById(id);


        if (!control) {

            return null;

        }


        return control.getCommand();

    }


    // =====================================
    // Valor
    // =====================================

    setValue(id, value) {

        const control = this.findById(id);


        if (!control) {

            return null;

        }


        control.setValue(value);


        return control;

    }


    getValue(id) {

        const control = this.findById(id);


        if (!control) {

            return null;

        }


        return control.getValue();

    }


    // =====================================
    // Reset
    // =====================================

    reset(id) {

        const control = this.findById(id);


        if (!control) {

            return null;

        }


        control.reset();


        return control;

    }


    resetAll() {

        for (const control of this.controls) {

            control.reset();

        }

    }


    // =====================================
    // Serialização
    // =====================================

    toJSON() {

        return this.controls.map(

            control => control.toJSON()

        );

    }

}


module.exports = ControlRepository;