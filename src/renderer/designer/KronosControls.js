const KronosControls = {

    panel: {

        name: "KRONOS",

        width: 1400,

        height: 760

    },

    leftButtons: [

        {
            id: "undo",
            label: "UNDO",
            type: "button",
            command: null
        },

        {
            id: "redo",
            label: "REDO",
            type: "button",
            command: null
        },

        {
            id: "copy",
            label: "COPY",
            type: "button",
            command: null
        },

        {
            id: "paste",
            label: "PASTE",
            type: "button",
            command: null
        },

        {
            id: "sync",
            label: "SYNC",
            type: "button",
            command: null
        },

        {
            id: "before",
            label: "BEFORE",
            type: "button",
            command: null
        }

    ],

    topEncoders: [

        {
            id: "exposure",
            label: "EXPOSURE",
            type: "encoder",
            commandLeft: null,
            commandRight: null,
            commandPress: null
        },

        {
            id: "contrast",
            label: "CONTRAST",
            type: "encoder",
            commandLeft: null,
            commandRight: null,
            commandPress: null
        },

        {
            id: "highlights",
            label: "HIGHLIGHTS",
            type: "encoder",
            commandLeft: null,
            commandRight: null,
            commandPress: null
        },

        {
            id: "shadows",
            label: "SHADOWS",
            type: "encoder",
            commandLeft: null,
            commandRight: null,
            commandPress: null
        },

        {
            id: "whites",
            label: "WHITES",
            type: "encoder",
            commandLeft: null,
            commandRight: null,
            commandPress: null
        }

    ],

    bottomEncoders: [

        {
            id: "blacks",
            label: "BLACKS",
            type: "encoder",
            commandLeft: null,
            commandRight: null,
            commandPress: null
        },

        {
            id: "temperature",
            label: "TEMP",
            type: "encoder",
            commandLeft: null,
            commandRight: null,
            commandPress: null
        },

        {
            id: "tint",
            label: "TINT",
            type: "encoder",
            commandLeft: null,
            commandRight: null,
            commandPress: null
        },

        {
            id: "vibrance",
            label: "VIBRANCE",
            type: "encoder",
            commandLeft: null,
            commandRight: null,
            commandPress: null
        },

        {
            id: "saturation",
            label: "SATURATION",
            type: "encoder",
            commandLeft: null,
            commandRight: null,
            commandPress: null
        }

    ],

    display: {

        id: "display",

        type: "display"

    },

    lowerEncoders: [

        {

            id: "leftWheel",

            type: "encoder",

            commandLeft: null,

            commandRight: null,

            commandPress: null

        },

        {

            id: "centerWheel",

            type: "encoder",

            commandLeft: null,

            commandRight: null,

            commandPress: null

        },

        {

            id: "rightWheel",

            type: "encoder",

            commandLeft: null,

            commandRight: null,

            commandPress: null

        }

    ],

    stars: [

        { id: "star1", label: "★", type: "button", command: null },

        { id: "star2", label: "★", type: "button", command: null },

        { id: "star3", label: "★", type: "button", command: null },

        { id: "star4", label: "★", type: "button", command: null },

        { id: "star5", label: "★", type: "button", command: null }

    ],

    actions: [

        {

            id: "pick",

            label: "PICK",

            type: "button",

            command: null

        },

        {

            id: "reject",

            label: "REJECT",

            type: "button",

            command: null

        }

    ],

    navigation: [

        {

            id: "fit",

            label: "FIT",

            type: "button",

            command: null

        },

        {

            id: "zoom",

            label: "1:1",

            type: "button",

            command: null

        }

    ]

};

export default KronosControls;