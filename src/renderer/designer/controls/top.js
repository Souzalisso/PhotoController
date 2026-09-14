const top = [

    {
        id: "exposure",
        label: "EXPOSIÇÃO",
        type: "encoder",
        configurable: true,
        push: true,
        led: "ring",
        defaultValue: 0,

        clockwiseCommand: null,
        counterClockwiseCommand: null,

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

        clockwiseCommand: null,
        counterClockwiseCommand: null,

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

        clockwiseCommand: null,
        counterClockwiseCommand: null,

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

        clockwiseCommand: null,
        counterClockwiseCommand: null,

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

        clockwiseCommand: null,
        counterClockwiseCommand: null,

        position: 5,

        hardware: {
            type: "ENC",
            id: 5
        }
    }

];

module.exports = top;