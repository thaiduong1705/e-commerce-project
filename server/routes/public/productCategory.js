const express = require("express");

const router = express.Router();

const { getAllPCate, getPCate } = require("../../controllers/productCategory");

router.route("/").get(getAllPCate);
router.route("/:pcid").get(getPCate);

module.exports = router;
