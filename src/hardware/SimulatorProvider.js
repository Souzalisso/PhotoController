class SimulatorProvider {

    constructor() {

        this.interval = null;

    }

    start(callback) {

        this.stop();

        const events = [

            "KRN|BTN|1|PRESS",

            "KRN|BTN|2|PRESS",

            "KRN|ENC|5|1",

            "KRN|ENC|5|-1",

            "KRN|POT|7|420",

            "KRN|BTN|8|PRESS"

        ];

        this.interval = setInterval(() => {

            const event =

                events[

                    Math.floor(

                        Math.random() * events.length

                    )

                ];

            callback(event);

        },

        2500);

        console.log(

            "Simulador iniciado."

        );

    }

    stop() {

        if (this.interval) {

            clearInterval(

                this.interval

            );

            this.interval = null;

        }

    }

}

export default new SimulatorProvider();