const express = require("express");
const router = express.Router();

const insertRouter = require("./private/admin/insert");
const authRouter = require("./auth");
const publicRouter = require("./public");
const privateRouter = require("./private");
const { verifyToken, isAdmin } = require("../middlewares/authentication");

router.use("/insert", insertRouter);
// login route
router.use("/auth", authRouter);

// public routes
router.use("/public", publicRouter);
// private routes
router.use("/private", verifyToken, privateRouter);

// insert

module.exports = router;
