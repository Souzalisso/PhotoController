export default class ProtocolParser {

    parse(message) {

        if (!message) {

            return null;

        }

        message = message.trim();

        const parts = message.split("|");

        if (parts.length < 4) {

            return null;

        }

        const device = parts[0];

        const type = parts[1];

        const id = Number(parts[2]);

        let value = parts[3];

        switch (type) {

            case "ENC":

            case "POT":

                value = Number(value);
                break;

            case "BTN":

                value = value.toUpperCase();
                break;

        }

        return {

            device,

            type,

            id,

            value

        };

    }

}