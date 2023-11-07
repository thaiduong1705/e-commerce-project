const express = require("express");

const router = express.Router();

const { getAllCate, getCate } = require("../../controllers/blogCategory");

router.route("/").get(getAllCate);

module.exports = router;
