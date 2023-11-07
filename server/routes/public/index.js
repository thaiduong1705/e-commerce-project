const express = require("express");
const router = express.Router();

const productRouter = require("./product");
const pCateRouter = require("./productCategory");
const bCateRouter = require("./blogCategory");
const blogRouter = require("./blog");
const brandRouter = require("./brand");
const couponRouter = require("./coupon");

router.use("/product", productRouter);
router.use("/product-category", pCateRouter);
router.use("/blog-category", bCateRouter);
router.use("/blog", blogRouter);
router.use("/brand", brandRouter);
router.use("/coupon", couponRouter);

module.exports = router;
