const express = require("express");
const router = express.Router();

const {
    createBlog,
    updateBlog,
    getBlogs,
} = require("../../../controllers/blog");

router.route("/").get(getBlogs).post(createBlog);
router.route("/:bid").put(updateBlog);

module.exports = router;
