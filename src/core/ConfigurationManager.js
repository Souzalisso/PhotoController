const fs = require("fs");
const path = require("path");

class ConfigurationManager {

    constructor() {

        this.configPath = path.join(

            __dirname,

            "../config/default.json"

        );

    }

    load() {

        try {

            const data = fs.readFileSync(

                this.configPath,

                "utf8"

            );

            return JSON.parse(data);

        }

        catch (error) {

            console.error(error);

            return null;

        }

    }

    save(configuration) {

        fs.writeFileSync(

            this.configPath,

            JSON.stringify(configuration, null, 4)

        );

    }

}

module.exports = new ConfigurationManager();