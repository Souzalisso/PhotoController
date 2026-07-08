class EventBus {

    constructor() {

        this.listeners = {};

    }

    on(eventName, callback) {

        if (!this.listeners[eventName]) {

            this.listeners[eventName] = [];

        }

        this.listeners[eventName].push(callback);

    }

    emit(eventName, data) {

        if (!this.listeners[eventName]) return;

        this.listeners[eventName].forEach(callback => {

            callback(data);

        });

    }

}

module.exports = new EventBus();