const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const productRouter = require("./product");

router.use("/user", userRouter);
router.use("/product", productRouter);

module.exports = router;
