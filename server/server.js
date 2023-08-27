const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

// Build in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Main route

// Error middleware

const start = async () => {
    try {
        app.listen(port, console.log(`Listening on localhost ${port}`));
    } catch (error) {
        console.log(error);
    }
};

start();
