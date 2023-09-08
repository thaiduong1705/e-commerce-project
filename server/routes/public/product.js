const express = require("express");

const router = express.Router();

const { getOneProduct } = require("../../controllers/product");

router.route("/").get((req, res) => {
    res.send("get all filter product");
});
router.route("/:id").get(getOneProduct);

module.exports = router;
