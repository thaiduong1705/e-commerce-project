const express = require("express");
const router = express.Router();

const profileRouter = require("./profile");
const ratingRouter = require("./rating");
const likeBlogRouter = require("./likeBlog");
const userRouter = require("./user");
const orderRouter = require("./order");

router.use("/my-profile", profileRouter);
router.use("/ratings", ratingRouter);
router.use("/react-blog", likeBlogRouter);
router.use("/current-user", userRouter);
router.use("/order", orderRouter);

module.exports = router;
