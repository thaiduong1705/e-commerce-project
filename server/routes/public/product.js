const express = require("express");

const router = express.Router();

const {
    getOneProduct,
    getFilterProduct,
} = require("../../controllers/product");

router.route("/").get(getFilterProduct);
router.route("/:pid").get(getOneProduct);

module.exports = router;
