const express = require("express");
const router = express.Router();

const { getBlogs, getOneBlog } = require("../../controllers/blog");

router.route("/").get(getBlogs);
router.route("/:bid").get(getOneBlog);

module.exports = router;
