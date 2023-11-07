const express = require("express");

const router = express.Router();

const { getAllCoupon } = require("../../controllers/coupon");

router.route("/").get(getAllCoupon);

module.exports = router;
