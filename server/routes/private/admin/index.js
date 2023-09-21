const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const productRouter = require("./product");
const pCateRouter = require("./productCategory");
const bCateRouter = require("./blogCategory");
const blogRouter = require("./blog");

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/product-category", pCateRouter);
router.use("/blog-category", bCateRouter);
router.use("/blog", blogRouter);
module.exports = router;
