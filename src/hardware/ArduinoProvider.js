const { SerialPort } = require("serialport");

const {
    ReadlineParser
} = require("@serialport/parser-readline");


class ArduinoProvider {

    constructor() {

        this.port = null;

        this.parser = null;

        this.connected = false;

        this.dataCallback = null;
    }


    // =====================================
    // Conectar
    // =====================================

    connect(
        portName = "COM3",
        baudRate = 115200
    ) {

        if (this.connected) {
            return;
        }


        try {

            this.port =
                new SerialPort({
                    path: portName,
                    baudRate,
                    autoOpen: true
                });


            // =================================
            // Porta aberta
            // =================================

            this.port.on(
                "open",
                () => {

                    this.connected = true;

                    console.log(
                        `[KRONOS] Arduino conectado em ${portName} @ ${baudRate}`
                    );
                }
            );


            // =================================
            // Erro serial
            // =================================

            this.port.on(
                "error",
                error => {

                    console.error(
                        "[KRONOS] Erro na porta serial:",
                        error.message
                    );
                }
            );


            // =================================
            // Porta fechada
            // =================================

            this.port.on(
                "close",
                () => {

                    this.connected = false;

                    console.log(
                        "[KRONOS] Porta serial fechada."
                    );
                }
            );


            // =================================
            // Parser
            // =================================

            this.parser =
                this.port.pipe(
                    new ReadlineParser({
                        delimiter: "\n"
                    })
                );


        }
        catch (error) {

            this.connected = false;

            this.port = null;

            this.parser = null;

            console.error(
                "[KRONOS] Erro ao criar conexão serial:",
                error
            );
        }
    }


    // =====================================
    // Desconectar
    // =====================================

    disconnect() {

        if (!this.port) {

            this.connected = false;

            return;
        }


        try {

            if (this.port.isOpen) {

                this.port.close();
            }

        }
        catch (error) {

            console.error(
                "[KRONOS] Erro ao fechar porta serial:",
                error
            );
        }


        this.port = null;

        this.parser = null;

        this.connected = false;
    }


    // =====================================
    // Receber dados
    // =====================================

    onData(callback) {

        if (
            !this.parser ||
            typeof callback !== "function"
        ) {

            return;
        }


        this.dataCallback = callback;


        this.parser.on(
            "data",
            message => {

                const cleanMessage =
                    String(message).trim();


                if (!cleanMessage) {
                    return;
                }


                callback(
                    cleanMessage
                );
            }
        );
    }


    // =====================================
    // Status
    // =====================================

    isConnected() {

        return this.connected;
    }
}


module.exports =
    new ArduinoProvider();