const actions = [

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

module.exports = actions;