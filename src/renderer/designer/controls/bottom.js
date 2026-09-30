const bottom = [

    {
        id: "blacks",
        label: "PRETOS",
        type: "encoder",
        configurable: true,
        push: false,
        led: "ring",
        defaultValue: 0,
        clockwiseCommand: null,
        counterClockwiseCommand: null,
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
        push: false,
        led: "ring",
        defaultValue: 0,
        clockwiseCommand: null,
        counterClockwiseCommand: null,
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
        push: false,
        led: "ring",
        defaultValue: 0,
        clockwiseCommand: null,
        counterClockwiseCommand: null,
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
        push: false,
        led: "ring",
        defaultValue: 0,
        clockwiseCommand: null,
        counterClockwiseCommand: null,
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
        push: false,
        led: "ring",
        defaultValue: 0,
        clockwiseCommand: null,
        counterClockwiseCommand: null,
        position: 5,
        hardware: {
            type: "ENC",
            id: 10
        }
    }

];

module.exports = bottom;