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

        const configuration = JSON.parse(data);

        if (!configuration.controls) {

            configuration.controls = {};

        }

        return configuration;

    }

    catch (error) {

        return {

            controls: {}

        };

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