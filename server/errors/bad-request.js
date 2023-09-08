const CustomAPIError = require("./custom-error");

class BadResquestError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }
}

module.exports = BadResquestError;
