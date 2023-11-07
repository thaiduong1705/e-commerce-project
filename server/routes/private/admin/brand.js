const express = require("express");
const router = express.Router();

const { createBrand, updateBrand, deleteBrand } = require("../../../controllers/brand");

router.route("/").post(createBrand);
router.route("/:bid").put(updateBrand).delete(deleteBrand);

module.exports = router;
