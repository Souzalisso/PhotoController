const KronosControls = [

    //---------------------------------
    // COLUNA ESQUERDA
    //---------------------------------

    {
        id: "undo",
        type: "button",
        text: "UNDO",
        group: "left"
    },

    {
        id: "redo",
        type: "button",
        text: "REDO",
        group: "left"
    },

    {
        id: "copy",
        type: "button",
        text: "COPY",
        group: "left"
    },

    {
        id: "paste",
        type: "button",
        text: "PASTE",
        group: "left"
    },

    {
        id: "sync",
        type: "button",
        text: "SYNC",
        group: "left"
    },

    {
        id: "beforeAfter",
        type: "button",
        text: "BEFORE\nAFTER",
        group: "left"
    },

    //---------------------------------
    // PRIMEIRA LINHA
    //---------------------------------

    {
        id:"exposure",
        type:"encoder",
        label:"EXPOSIÇÃO",
        color:"#ffffff"
    },

    {
        id:"contrast",
        type:"encoder",
        label:"CONTRASTE",
        color:"#ff6b35"
    },

    {
        id:"highlights",
        type:"encoder",
        label:"REALCES",
        color:"#ff8c42"
    },

    {
        id:"shadows",
        type:"encoder",
        label:"SOMBRAS",
        color:"#f3c623"
    },

    {
        id:"whites",
        type:"encoder",
        label:"BRANCOS",
        color:"#5dd65d"
    },

    //---------------------------------
    // SEGUNDA LINHA
    //---------------------------------

    {
        id:"blacks",
        type:"encoder",
        label:"PRETOS",
        color:"#5bc0eb"
    },

    {
        id:"temperature",
        type:"encoder",
        label:"TEMPERATURA",
        color:"#33c3ff"
    },

    {
        id:"tint",
        type:"encoder",
        label:"MATIZ",
        color:"#8b5cf6"
    },

    {
        id:"vibrance",
        type:"encoder",
        label:"VIBRATILIDADE",
        color:"#d946ef"
    },

    {
        id:"saturation",
        type:"encoder",
        label:"SATURAÇÃO",
        color:"#ff3366"
    },

    //---------------------------------
    // DISPLAY
    //---------------------------------

    {
        id:"display",
        type:"display"
    },

    //---------------------------------
    // ENCODERS NAVEGAÇÃO
    //---------------------------------

    {
        id:"encoderA",
        type:"smallEncoder",
        label:"A"
    },

    {
        id:"navigation",
        type:"navigation"
    },

    {
        id:"encoderB",
        type:"smallEncoder",
        label:"B"
    },

    //---------------------------------
    // ESTRELAS
    //---------------------------------

    {
        id:"star1",
        type:"star",
        value:1
    },

    {
        id:"star2",
        type:"star",
        value:2
    },

    {
        id:"star3",
        type:"star",
        value:3
    },

    {
        id:"star4",
        type:"star",
        value:4
    },

    {
        id:"star5",
        type:"star",
        value:5
    },

    //---------------------------------
    // PICK
    //---------------------------------

    {
        id:"pick",
        type:"pick"
    },

    {
        id:"reject",
        type:"reject"
    },

    //---------------------------------
    // DIREITA
    //---------------------------------

    {
        id:"p1",
        type:"button",
        text:"P1",
        group:"right"
    },

    {
        id:"p2",
        type:"button",
        text:"P2",
        group:"right"
    },

    {
        id:"edit",
        type:"button",
        text:"EDIT",
        group:"right"
    },

    //---------------------------------
    // NAVEGAÇÃO
    //---------------------------------

    {
        id:"left",
        type:"arrow",
        direction:"left"
    },

    {
        id:"right",
        type:"arrow",
        direction:"right"
    },

    {
        id:"fit",
        type:"button",
        text:"FIT"
    },

    {
        id:"zoom",
        type:"button",
        text:"1:1"
    }

];

export default KronosControls;