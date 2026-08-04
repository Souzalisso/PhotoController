const left = require("./controls/left");
const top = require("./controls/top");
const bottom = require("./controls/bottom");
const right = require("./controls/right");
const center = require("./controls/center");
const stars = require("./controls/stars");
const actions = require("./controls/actions");

class KronosControls {

    static left = Object.freeze(left);

    static top = Object.freeze(top);

    static bottom = Object.freeze(bottom);

    static right = Object.freeze(right);

    static stars = Object.freeze(stars);

    static actions = Object.freeze(actions);

    static center = Object.freeze(center);

    static get all() {

        return [

            ...this.left,

            ...this.top,

            ...this.bottom,

            ...this.right,

            ...this.stars,

            ...this.actions,

            this.center.display,

            this.center.leftEncoder,

            this.center.mainEncoder,

            this.center.rightEncoder

        ];

    }

    static findById(id) {

        return this.all.find(control => control.id === id) || null;

    }

    static findByHardware(type, id) {

        return this.all.find(control =>

            control.hardware?.type === type &&

            control.hardware?.id === id

        ) || null;

    }

    static getButtons() {

        return this.all.filter(control => control.type === "button");

    }

    static getEncoders() {

        return this.all.filter(control => control.type === "encoder");

    }

    static getDisplays() {

        return this.all.filter(control => control.type === "display");

    }

    static validate() {

        const ids = new Set();

        const hardwareIds = new Set();

        for (const control of this.all) {

            if (ids.has(control.id)) {

                throw new Error(
                    `Controle duplicado: ${control.id}`
                );

            }

            ids.add(control.id);

            if (control.hardware) {

                const key = `${control.hardware.type}-${control.hardware.id}`;

                if (hardwareIds.has(key)) {

                    throw new Error(
                        `Hardware duplicado: ${key}`
                    );

                }

                hardwareIds.add(key);

            }

        }

        return true;

    }

}

KronosControls.validate();

Object.freeze(KronosControls);

module.exports = KronosControls;