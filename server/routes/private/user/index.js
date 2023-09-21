const express = require("express");
const router = express.Router();

const profileRouter = require("./profile");
const ratingRouter = require("./rating");

router.use("/my-profile", profileRouter);
router.use("/ratings", ratingRouter);

module.exports = router;
