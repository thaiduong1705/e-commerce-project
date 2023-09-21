const express = require("express");
const router = express.Router();

const {
    getAllCate,
    getCate,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../../../controllers/blogCategory");

router.route("/").post(createCategory);
router.route("/:bcid").put(updateCategory).delete(deleteCategory);

module.exports = router;
