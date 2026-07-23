/**
 * ==========================================================
 * KRONOS CONTROLS
 * ----------------------------------------------------------
 * Cadastro oficial de todos os controles físicos do KRONOS.
 *
 * Nenhum outro arquivo deve duplicar essas informações.
 *
 * Todo Renderer, HardwareService, ConfigurationManager
 * e LightroomService utilizarão este arquivo.
 * ==========================================================
 */

const controls = {

    left: [

        {
            id: "undo",
            label: "UNDO",
            type: "button",
            command: "undo",
            configurable: true,
            led: false,
            firmwarePin: null,
            position: 1
        },

        {
            id: "redo",
            label: "REDO",
            type: "button",
            command: "redo",
            configurable: true,
            led: false,
            firmwarePin: null,
            position: 2
        },

        {
            id: "copy",
            label: "COPY",
            type: "button",
            command: "copy-settings",
            configurable: true,
            led: false,
            firmwarePin: null,
            position: 3
        },

        {
            id: "paste",
            label: "PASTE",
            type: "button",
            command: "paste-settings",
            configurable: true,
            led: false,
            firmwarePin: null,
            position: 4
        },

        {
            id: "sync",
            label: "SYNC",
            type: "button",
            command: "sync-settings",
            configurable: true,
            led: false,
            firmwarePin: null,
            position: 5
        },

        {
            id: "before-after",
            label: "BEFORE / AFTER",
            type: "button",
            command: "before-after",
            configurable: true,
            led: false,
            firmwarePin: null,
            position: 6
        }

    ],

    top: [

        {
            id: "exposure",
            label: "EXPOSIÇÃO",
            type: "encoder",
            command: "exposure",
            configurable: true,
            push: true,
            led: "ring",
            firmwarePin: null,
            defaultValue: 0,
            position: 1
        },

        {
            id: "contrast",
            label: "CONTRASTE",
            type: "encoder",
            command: "contrast",
            configurable: true,
            push: true,
            led: "ring",
            firmwarePin: null,
            defaultValue: 0,
            position: 2
        },

        {
            id: "highlights",
            label: "REALCES",
            type: "encoder",
            command: "highlights",
            configurable: true,
            push: true,
            led: "ring",
            firmwarePin: null,
            defaultValue: 0,
            position: 3
        },

        {
            id: "shadows",
            label: "SOMBRAS",
            type: "encoder",
            command: "shadows",
            configurable: true,
            push: true,
            led: "ring",
            firmwarePin: null,
            defaultValue: 0,
            position: 4
        },

        {
            id: "whites",
            label: "BRANCOS",
            type: "encoder",
            command: "whites",
            configurable: true,
            push: true,
            led: "ring",
            firmwarePin: null,
            defaultValue: 0,
            position: 5
        }

    ],

    center: {

    display: {
        id: "display",
        label: "OLED DISPLAY",
        type: "display",
        configurable: false,
        firmwarePin: null
    },

    leftEncoder: {
        id: "encoder-left",
        label: "MENU",
        type: "encoder",
        command: "menu-navigation",
        configurable: true,
        push: true,
        led: "ring",
        firmwarePin: null,
        defaultValue: 0
    },

    mainEncoder: {
        id: "encoder-main",
        label: "NAVEGAÇÃO",
        type: "encoder",
        command: "navigate",
        configurable: true,
        push: true,
        led: "ring",
        firmwarePin: null,
        defaultValue: 0
    },

    rightEncoder: {
        id: "encoder-right",
        label: "ZOOM",
        type: "encoder",
        command: "zoom",
        configurable: true,
        push: true,
        led: "ring",
        firmwarePin: null,
        defaultValue: 0
    }

},

bottom: [

    {
        id: "blacks",
        label: "PRETOS",
        type: "encoder",
        command: "blacks",
        configurable: true,
        push: true,
        led: "ring",
        firmwarePin: null,
        defaultValue: 0,
        position: 1
    },

    {
        id: "temperature",
        label: "TEMPERATURA",
        type: "encoder",
        command: "temperature",
        configurable: true,
        push: true,
        led: "ring",
        firmwarePin: null,
        defaultValue: 0,
        position: 2
    },

    {
        id: "tint",
        label: "MATIZ",
        type: "encoder",
        command: "tint",
        configurable: true,
        push: true,
        led: "ring",
        firmwarePin: null,
        defaultValue: 0,
        position: 3
    },

    {
        id: "vibrance",
        label: "VIBRATILIDADE",
        type: "encoder",
        command: "vibrance",
        configurable: true,
        push: true,
        led: "ring",
        firmwarePin: null,
        defaultValue: 0,
        position: 4
    },

    {
        id: "saturation",
        label: "SATURAÇÃO",
        type: "encoder",
        command: "saturation",
        configurable: true,
        push: true,
        led: "ring",
        firmwarePin: null,
        defaultValue: 0,
        position: 5
    }

],

right: [

    {
        id: "p1",
        label: "P1",
        type: "button",
        command: "preset-1",
        configurable: true,
        led: false,
        firmwarePin: null,
        position: 1
    },

    {
        id: "p2",
        label: "P2",
        type: "button",
        command: "preset-2",
        configurable: true,
        led: false,
        firmwarePin: null,
        position: 2
    },

    {
        id: "edit",
        label: "EDIT",
        type: "button",
        command: "edit-mode",
        configurable: false,
        led: false,
        firmwarePin: null,
        position: 3
    }

],

stars: [

    {
        id: "rate-1",
        label: "★",
        type: "button",
        command: "rate-1",
        configurable: true,
        led: false,
        firmwarePin: null,
        position: 1
    },

    {
        id: "rate-2",
        label: "★★",
        type: "button",
        command: "rate-2",
        configurable: true,
        led: false,
        firmwarePin: null,
        position: 2
    },

    {
        id: "rate-3",
        label: "★★★",
        type: "button",
        command: "rate-3",
        configurable: true,
        led: false,
        firmwarePin: null,
        position: 3
    },

    {
        id: "rate-4",
        label: "★★★★",
        type: "button",
        command: "rate-4",
        configurable: true,
        led: false,
        firmwarePin: null,
        position: 4
    },

    {
        id: "rate-5",
        label: "★★★★★",
        type: "button",
        command: "rate-5",
        configurable: true,
        led: false,
        firmwarePin: null,
        position: 5
    }

],

actions: [

    {
        id: "pick",
        label: "PICK",
        type: "button",
        command: "pick",
        configurable: true,
        led: false,
        firmwarePin: null,
        position: 1
    },

    {
        id: "reject",
        label: "REJECT",
        type: "button",
        command: "reject",
        configurable: true,
        led: false,
        firmwarePin: null,
        position: 2
    },

    {
        id: "previous",
        label: "←",
        type: "button",
        command: "previous-photo",
        configurable: true,
        led: false,
        firmwarePin: null,
        position: 3
    },

    {
        id: "next",
        label: "→",
        type: "button",
        command: "next-photo",
        configurable: true,
        led: false,
        firmwarePin: null,
        position: 4
    },

    {
        id: "fit",
        label: "FIT",
        type: "button",
        command: "fit",
        configurable: true,
        led: false,
        firmwarePin: null,
        position: 5
    },

    {
        id: "zoom-1-1",
        label: "1:1",
        type: "button",
        command: "zoom-1-1",
        configurable: true,
        led: false,
        firmwarePin: null,
        position: 6
    }

],
};

/* ==========================================================
 * MÉTODOS UTILITÁRIOS
 * ========================================================== */

controls.getAll = function () {

    return [

        ...this.left,
        ...this.top,
        ...Object.values(this.center),
        ...this.bottom,
        ...this.right,
        ...this.stars,
        ...this.actions

    ];

};

controls.findById = function (id) {

    return this.getAll().find(control => control.id === id);

};

controls.findByCommand = function (command) {

    return this.getAll().find(control => control.command === command);

};

controls.findByType = function (type) {

    return this.getAll().filter(control => control.type === type);

};

controls.findByGroup = function (group) {

    return this[group] || [];

};

controls.getButtons = function () {

    return this.findByType("button");

};

controls.getEncoders = function () {

    return this.findByType("encoder");

};

controls.getDisplays = function () {

    return this.findByType("display");

};

controls.getConfigurable = function () {

    return this.getAll().filter(control => control.configurable);

};

controls.exists = function (id) {

    return this.findById(id) !== undefined;

};

controls.count = function () {

    return this.getAll().length;

};

controls.validate = function () {

    const ids = new Set();

    for (const control of this.getAll()) {

        if (ids.has(control.id)) {

            throw new Error(`Controle duplicado: ${control.id}`);

        }

        ids.add(control.id);

    }

    return true;

};

controls.validate();

Object.freeze(controls);

export default controls;