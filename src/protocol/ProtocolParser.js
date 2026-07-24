class ProtocolParser {

    parse(message) {

        if (!message) {

            return null;

        }

        message = message.trim();

        if (!message.length) {

            return null;

        }

        const parts = message.split("|");

        if (parts.length < 4) {

            return null;

        }

        const device = parts[0];
        const type = parts[1];
        const id = Number(parts[2]);

        let value = parts[3];

        if (type === "ENC" || type === "POT") {

            value = Number(value);

        }

        return {

            raw: message,

            timestamp: Date.now(),

            device,

            type,

            id,

            value

        };

    }

}

module.exports = new ProtocolParser();