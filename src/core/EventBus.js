class EventBus {

    constructor() {

        this.events = new Map();

    }

    on(event, callback) {

        if (!this.events.has(event)) {

            this.events.set(event, []);

        }

        this.events.get(event).push(callback);

    }

    off(event, callback) {

        if (!this.events.has(event)) {

            return;

        }

        const listeners = this.events.get(event);

        this.events.set(

            event,

            listeners.filter(listener => listener !== callback)

        );

    }

    emit(event, payload = null) {

        if (!this.events.has(event)) {

            return;

        }

        this.events.get(event).forEach(listener => {

            listener(payload);

        });

    }

    clear(event = null) {

        if (event) {

            this.events.delete(event);

            return;

        }

        this.events.clear();

    }

}

const eventBus = new EventBus();

export default eventBus;