const CONTROL_TYPES = Object.freeze({

    BUTTON: "button",

    ENCODER: "encoder",

    DISPLAY: "display",

    NAVIGATION: "navigation",

    STAR: "star",

    ACTION: "action",

    ARROW: "arrow"

});

const GROUPS = Object.freeze({

    LEFT: "left",

    TOP: "top",

    DISPLAY: "display",

    RIGHT: "right",

    BOTTOM: "bottom",

    RATING: "rating",

    ACTIONS: "actions",

    NAVIGATION: "navigation"

});

const SIZES = Object.freeze({

    SMALL: "small",

    MEDIUM: "medium",

    LARGE: "large"

});

const LED_COLORS = Object.freeze({

    NONE: "",

    WHITE: "#FFFFFF",

    RED: "#FF4D4D",

    ORANGE: "#FF8C42",

    YELLOW: "#FFD54A",

    GREEN: "#5CFF6B",

    CYAN: "#2ED8FF",

    BLUE: "#4A8DFF",

    PURPLE: "#B16CFF",

    PINK: "#FF5CC8"

});

const STATES = Object.freeze({

    DEFAULT: "default",

    HOVER: "hover",

    ACTIVE: "active",

    SELECTED: "selected",

    DISABLED: "disabled"

});

module.exports = {

    CONTROL_TYPES,

    GROUPS,

    SIZES,

    LED_COLORS,

    STATES

};