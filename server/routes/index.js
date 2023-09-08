const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const publicRouter = require("./public");
const privateRouter = require("./private");
const { verifyToken, isAdmin } = require("../middlewares/authentication");

// login route
router.use("/auth", authRouter);

// public routes
router.use("public", publicRouter);
// private routes
router.use("/private", verifyToken, privateRouter);

module.exports = router;
