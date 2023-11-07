const express = require("express");
const router = express.Router();

const { createCoupon, updateCoupon, deleteCoupon } = require("../../../controllers/coupon");

router.route("/").post(createCoupon);
router.route("/:cid").put(updateCoupon).delete(deleteCoupon);

module.exports = router;
