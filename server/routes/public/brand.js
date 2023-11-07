const express = require("express");

const router = express.Router();

const { getAllBrand } = require("../../controllers/brand");

router.route("/").get(getAllBrand);

module.exports = router;
