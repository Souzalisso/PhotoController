const bottom = [

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

module.exports = bottom;