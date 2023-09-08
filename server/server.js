const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const connect = require("./configs/connect");
const notFound = require("./middlewares/not-found");
const errorHandler = require("./middlewares/error-handler");

const mainRouter = require("./routes");
const app = express();
const port = process.env.PORT || 8000;

// Build in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Main route
app.use("/api/v1", mainRouter);
// Error middleware
app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try {
        await connect(process.env.MONGO_STRING);
        console.log("Connected to Mongo");
        app.listen(port, console.log(`Listening on localhost ${port}`));
    } catch (error) {
        console.log(error);
    }
};

start();
