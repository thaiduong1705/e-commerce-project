const express = require("express");
const router = express.Router();

const { updateStatus, getAllOrder } = require("../../../controllers/order");

// all user
router.route("/").get(getAllOrder);
router.route("/status/:oid").put(updateStatus).get(getAllOrder);

module.exports = router;
