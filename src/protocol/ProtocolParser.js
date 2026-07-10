class ProtocolParser {

    parse(message) {

        message = message.trim();

        const parts = message.split("|");

        if (parts.length < 4) {

            return null;

        }

        const type = parts[1];

        let value = parts[3];

        if (type === "POT" || type === "ENC") {

            value = Number(value);

        }

        return {

            device: parts[0],

            type,

            id: Number(parts[2]),

            value

        };

    }

}

module.exports = new ProtocolParser();