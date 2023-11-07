const express = require("express");
const router = express.Router();

const { getCurrentUser, updateUser, updateUserAddress, updateUserCart } = require("../../../controllers/user");

// all user
router.route("/").get(getCurrentUser).put(updateUser);
router.route("/address").put(updateUserAddress);
router.route("/cart").put(updateUserCart);

module.exports = router;
