const express = require("express");

const router = express.Router();

const { rate } = require("../../../controllers/product");

router.route("/").put(rate);

module.exports = router;
