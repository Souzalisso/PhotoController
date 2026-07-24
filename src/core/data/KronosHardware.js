const KronosHardware = {

    info: {

        name: "KRONOS",
        version: "1.0.0",
        firmware: "--"

    },

    serial: {

        connected: false,
        port: "--"

    },

    controls: {

        buttons: [

            { id: 1, label: "BTN 1", command: null },
            { id: 2, label: "BTN 2", command: null },
            { id: 3, label: "BTN 3", command: null },
            { id: 4, label: "BTN 4", command: null },
            { id: 5, label: "BTN 5", command: null },
            { id: 6, label: "BTN 6", command: null },
            { id: 7, label: "BTN 7", command: null },
            { id: 8, label: "BTN 8", command: null }

        ],

        encoders: [

            { id: 1, label: "ENC 1", commandLeft: null, commandRight: null },
            { id: 2, label: "ENC 2", commandLeft: null, commandRight: null }

        ],

        potentiometers: [

            { id: 1, label: "POT 1", command: null },
            { id: 2, label: "POT 2", command: null },
            { id: 3, label: "POT 3", command: null }

        ]

    }

};

export default KronosHardware;