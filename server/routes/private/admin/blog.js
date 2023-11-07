const express = require("express");
const router = express.Router();

const { createBlog, updateBlog, getBlogs, deleteBlog, updateImageBlog } = require("../../../controllers/blog");
const uploader = require("../../../configs/cloudinary");

router.route("/").get(getBlogs).post(createBlog);
router.route("/:bid").put(updateBlog).delete(deleteBlog);
router.route("/upload-image/:bid").put(uploader.single("image"), updateImageBlog);
module.exports = router;
