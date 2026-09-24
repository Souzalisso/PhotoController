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
        label: "A",
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
            id: 11
        }
    },

    mainEncoder: {
        id: "encoder-main",
        label: "NAVEGAÇÃO / ZOOM",
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
            id: 12
        }
    },

    rightEncoder: {
        id: "encoder-right",
        label: "B",
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
            id: 13
        }
    }
};

module.exports = center;