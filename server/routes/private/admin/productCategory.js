const express = require("express");
const router = express.Router();

const {
    getAllPCate,
    createPCategory,
    getPCate,
    updatePCategory,
    deletePCategory,
} = require("../../../controllers/productCategory");

router.route("/").post(createPCategory);
router.route("/:pcid").put(updatePCategory).delete(deletePCategory);

module.exports = router;
