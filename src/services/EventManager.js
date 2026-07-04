class EventManager {

    constructor() {

        this.listeners = {};

    }

    /**
     * Registra um evento.
     */
    on(eventName, callback) {

        if (!this.listeners[eventName]) {

            this.listeners[eventName] = [];

        }

        this.listeners[eventName].push(callback);

    }

    /**
     * Dispara um evento.
     */
    emit(eventName, data = null) {

        if (!this.listeners[eventName]) {

            return;

        }

        this.listeners[eventName].forEach(callback => {

            callback(data);

        });

    }

}

module.exports = EventManager;