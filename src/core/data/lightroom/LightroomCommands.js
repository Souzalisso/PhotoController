const LightroomCommands = [

    // ==========================================
    // NAVEGAÇÃO
    // ==========================================

    {
        id: "next-photo",
        category: "Navegação",
        name: "Próxima Foto",
        shortcut: "ArrowRight",
        type: "button",
        configurable: true
    },

    {
        id: "previous-photo",
        category: "Navegação",
        name: "Foto Anterior",
        shortcut: "ArrowLeft",
        type: "button",
        configurable: true
    },

    // ==========================================
    // CLASSIFICAÇÃO
    // ==========================================

    {
        id: "flag",
        category: "Classificação",
        name: "Marcar como Selecionada",
        shortcut: "P",
        type: "button",
        configurable: true
    },

    {
        id: "reject",
        category: "Classificação",
        name: "Rejeitar Foto",
        shortcut: "X",
        type: "button",
        configurable: true
    },

    {
        id: "unflag",
        category: "Classificação",
        name: "Remover Marcação",
        shortcut: "U",
        type: "button",
        configurable: true
    },

    {
        id: "star1",
        category: "Classificação",
        name: "1 Estrela",
        shortcut: "1",
        type: "button",
        configurable: true
    },

    {
        id: "star2",
        category: "Classificação",
        name: "2 Estrelas",
        shortcut: "2",
        type: "button",
        configurable: true
    },

    {
        id: "star3",
        category: "Classificação",
        name: "3 Estrelas",
        shortcut: "3",
        type: "button",
        configurable: true
    },

    {
        id: "star4",
        category: "Classificação",
        name: "4 Estrelas",
        shortcut: "4",
        type: "button",
        configurable: true
    },

    {
        id: "star5",
        category: "Classificação",
        name: "5 Estrelas",
        shortcut: "5",
        type: "button",
        configurable: true
    },

    // ==========================================
    // EDIÇÃO
    // ==========================================

    {
        id: "copy-settings",
        category: "Edição",
        name: "Copiar Ajustes",
        shortcut: "Ctrl+Shift+C",
        type: "button",
        configurable: true
    },

    {
        id: "paste-settings",
        category: "Edição",
        name: "Colar Ajustes",
        shortcut: "Ctrl+Shift+V",
        type: "button",
        configurable: true
    },

    {
        id: "sync-settings",
        category: "Edição",
        name: "Sincronizar Ajustes",
        shortcut: "Ctrl+Shift+S",
        type: "button",
        configurable: true
    },

    {
        id: "undo",
        category: "Edição",
        name: "Desfazer",
        shortcut: "Ctrl+Z",
        type: "button",
        configurable: true
    },

    {
        id: "redo",
        category: "Edição",
        name: "Refazer",
        shortcut: "Ctrl+Shift+Z",
        type: "button",
        configurable: true
    },

    // ==========================================
    // VISUALIZAÇÃO
    // ==========================================

    {
        id: "before-after",
        category: "Visualização",
        name: "Antes / Depois",
        shortcut: "\\",
        type: "button",
        configurable: true
    }

];

export default LightroomCommands;