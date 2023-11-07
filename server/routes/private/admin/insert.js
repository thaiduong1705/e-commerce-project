const express = require("express");
const router = express.Router();

const { insertProduct, insertProductCate } = require("../../../controllers/insertData");

//
router.route("/").get(insertProduct).post(insertProductCate);

module.exports = router;
