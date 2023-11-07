const express = require("express");
const router = express.Router();

const { likeBlog, dislikeBlog } = require("../../../controllers/blog");

// all user
router.route("/like/:bid").put(likeBlog);
router.route("/dislike/:bid").put(dislikeBlog);

module.exports = router;
