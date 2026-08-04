const center = {

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

module.exports = center;