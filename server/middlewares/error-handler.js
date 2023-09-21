const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        msg: err.message || "Something wrong",
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    };

    if (err.name === "ValidationError") {
        customError.msg = Object.values(err.errors)
            .map((error) => error.message)
            .join(" ");
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(
            err.keyValue
        )} field, please choose another value`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    if (err.name === "CastError") {
        customError.msg = `No item found with id : ${err.value}`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    return res.status(customError.statusCode).json(customError);
    //return res.status(customError.statusCode).json({ err });
};

module.exports = errorHandlerMiddleware;
