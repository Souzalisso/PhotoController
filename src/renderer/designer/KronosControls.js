class KronosControls {

    static left = [

        {
            id: "undo",

            label: "UNDO",

            type: "button",

            configurable: true,

            led: false,

            position: 1,

            hardware: {

                type: "BTN",

                id: 1

            }

        },

        {
            id: "redo",

            label: "REDO",

            type: "button",

            configurable: true,

            led: false,

            position: 2,

            hardware: {

                type: "BTN",

                id: 2

            }

        },

        {
            id: "copy",

            label: "COPY",

            type: "button",

            configurable: true,

            led: false,

            position: 3,

            hardware: {

                type: "BTN",

                id: 3

            }

        },

        {
            id: "paste",

            label: "PASTE",

            type: "button",

            configurable: true,

            led: false,

            position: 4,

            hardware: {

                type: "BTN",

                id: 4

            }

        },

        {
            id: "sync",

            label: "SYNC",

            type: "button",

            configurable: true,

            led: false,

            position: 5,

            hardware: {

                type: "BTN",

                id: 5

            }

        },

        {
            id: "before-after",

            label: "BEFORE",

            type: "button",

            configurable: true,

            led: false,

            position: 6,

            hardware: {

                type: "BTN",

                id: 6

            }

        }

    ];



    static top = [

        {

            id: "exposure",

            label: "EXPOSIÇÃO",

            type: "encoder",

            configurable: true,

            push: true,

            led: "ring",

            defaultValue: 0,

            position: 1,

            hardware: {

                type: "ENC",

                id: 1

            }

        },

        {

            id: "contrast",

            label: "CONTRASTE",

            type: "encoder",

            configurable: true,

            push: true,

            led: "ring",

            defaultValue: 0,

            position: 2,

            hardware: {

                type: "ENC",

                id: 2

            }

        },

        {

            id: "highlights",

            label: "REALCES",

            type: "encoder",

            configurable: true,

            push: true,

            led: "ring",

            defaultValue: 0,

            position: 3,

            hardware: {

                type: "ENC",

                id: 3

            }

        },

        {

            id: "shadows",

            label: "SOMBRAS",

            type: "encoder",

            configurable: true,

            push: true,

            led: "ring",

            defaultValue: 0,

            position: 4,

            hardware: {

                type: "ENC",

                id: 4

            }

        },

        {

            id: "whites",

            label: "BRANCOS",

            type: "encoder",

            configurable: true,

            push: true,

            led: "ring",

            defaultValue: 0,

            position: 5,

            hardware: {

                type: "ENC",

                id: 5

            }

        }

    ];
        static bottom = [

        {

            id: "blacks",

            label: "PRETOS",

            type: "encoder",

            configurable: true,

            push: true,

            led: "ring",

            defaultValue: 0,

            position: 1,

            hardware: {

                type: "ENC",

                id: 6

            }

        },

        {

            id: "temperature",

            label: "TEMPERATURA",

            type: "encoder",

            configurable: true,

            push: true,

            led: "ring",

            defaultValue: 0,

            position: 2,

            hardware: {

                type: "ENC",

                id: 7

            }

        },

        {

            id: "tint",

            label: "MATIZ",

            type: "encoder",

            configurable: true,

            push: true,

            led: "ring",

            defaultValue: 0,

            position: 3,

            hardware: {

                type: "ENC",

                id: 8

            }

        },

        {

            id: "vibrance",

            label: "VIBRATILIDADE",

            type: "encoder",

            configurable: true,

            push: true,

            led: "ring",

            defaultValue: 0,

            position: 4,

            hardware: {

                type: "ENC",

                id: 9

            }

        },

        {

            id: "saturation",

            label: "SATURAÇÃO",

            type: "encoder",

            configurable: true,

            push: true,

            led: "ring",

            defaultValue: 0,

            position: 5,

            hardware: {

                type: "ENC",

                id: 10

            }

        }

    ];



    static center = {

        display: {

            id: "display",

            label: "DISPLAY",

            type: "display",

            configurable: false,

            hardware: {

                type: "DISPLAY",

                id: 1

            }

        },



        leftEncoder: {

            id: "encoder-left",

            label: "LEFT",

            type: "encoder",

            configurable: true,

            push: true,

            led: "ring",

            defaultValue: 0,

            hardware: {

                type: "ENC",

                id: 11

            }

        },



        mainEncoder: {

            id: "encoder-main",

            label: "NAV",

            type: "encoder",

            configurable: true,

            push: true,

            led: "ring",

            defaultValue: 0,

            hardware: {

                type: "ENC",

                id: 12

            }

        },



        rightEncoder: {

            id: "encoder-right",

            label: "RIGHT",

            type: "encoder",

            configurable: true,

            push: true,

            led: "ring",

            defaultValue: 0,

            hardware: {

                type: "ENC",

                id: 13

            }

        }

    };
        static right = [

        {

            id: "p1",

            label: "P1",

            type: "button",

            configurable: true,

            led: true,

            position: 1,

            hardware: {

                type: "BTN",

                id: 7

            }

        },

        {

            id: "p2",

            label: "P2",

            type: "button",

            configurable: true,

            led: true,

            position: 2,

            hardware: {

                type: "BTN",

                id: 8

            }

        },

        {

            id: "edit",

            label: "EDIT",

            type: "button",

            configurable: true,

            led: true,

            position: 3,

            hardware: {

                type: "BTN",

                id: 9

            }

        }

    ];



    static stars = [

        {

            id: "rate-1",

            label: "★",

            type: "button",

            configurable: true,

            led: true,

            hardware: {

                type: "BTN",

                id: 10

            }

        },

        {

            id: "rate-2",

            label: "★★",

            type: "button",

            configurable: true,

            led: true,

            hardware: {

                type: "BTN",

                id: 11

            }

        },

        {

            id: "rate-3",

            label: "★★★",

            type: "button",

            configurable: true,

            led: true,

            hardware: {

                type: "BTN",

                id: 12

            }

        },

        {

            id: "rate-4",

            label: "★★★★",

            type: "button",

            configurable: true,

            led: true,

            hardware: {

                type: "BTN",

                id: 13

            }

        },

        {

            id: "rate-5",

            label: "★★★★★",

            type: "button",

            configurable: true,

            led: true,

            hardware: {

                type: "BTN",

                id: 14

            }

        }

    ];



    static actions = [

        {

            id: "pick",

            label: "PICK",

            type: "button",

            configurable: true,

            led: true,

            hardware: {

                type: "BTN",

                id: 15

            }

        },

        {

            id: "reject",

            label: "REJECT",

            type: "button",

            configurable: true,

            led: true,

            hardware: {

                type: "BTN",

                id: 16

            }

        },

        {

            id: "previous",

            label: "◀",

            type: "button",

            configurable: true,

            led: false,

            hardware: {

                type: "BTN",

                id: 17

            }

        },

        {

            id: "next",

            label: "▶",

            type: "button",

            configurable: true,

            led: false,

            hardware: {

                type: "BTN",

                id: 18

            }

        },

        {

            id: "fit",

            label: "FIT",

            type: "button",

            configurable: true,

            led: false,

            hardware: {

                type: "BTN",

                id: 19

            }

        },

        {

            id: "zoom-1-1",

            label: "1:1",

            type: "button",

            configurable: true,

            led: false,

            hardware: {

                type: "BTN",

                id: 20

            }

        }

    ];
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

        return this.all.find(

            control => control.id === id

        ) || null;

    }



    static findByHardware(type, id) {

        return this.all.find(control =>

            control.hardware?.type === type &&

            control.hardware?.id === id

        ) || null;

    }



    static getButtons() {

        return this.all.filter(

            control => control.type === "button"

        );

    }



    static getEncoders() {

        return this.all.filter(

            control => control.type === "encoder"

        );

    }



    static getDisplays() {

        return this.all.filter(

            control => control.type === "display"

        );

    }



    static validate() {

        const ids = new Set();

        const hardware = new Set();

        for (const control of this.all) {

            if (ids.has(control.id)) {

                throw new Error(

                    `Controle duplicado: ${control.id}`

                );

            }

            ids.add(control.id);

            if (control.hardware) {

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



    static initialize() {

        this.validate();

        Object.freeze(this.left);

        Object.freeze(this.top);

        Object.freeze(this.bottom);

        Object.freeze(this.right);

        Object.freeze(this.stars);

        Object.freeze(this.actions);

        Object.freeze(this.center);

        Object.freeze(this);

    }

}



KronosControls.initialize();

export default KronosControls;