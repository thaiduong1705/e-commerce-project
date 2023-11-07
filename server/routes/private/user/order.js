const express = require("express");
const router = express.Router();

const { createOrder, getUserOrder } = require("../../../controllers/order");

// all user
router.route("/").post(createOrder).get(getUserOrder);

module.exports = router;
