const express = require("express");
const router = express.Router();

const {
    getMyProfile,
    updateMyProfile,
} = require("../../../controllers/my-profile");

// all user
router.route("/").get(getMyProfile).put(updateMyProfile);

module.exports = router;
