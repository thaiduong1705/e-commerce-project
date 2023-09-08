const express = require("express");
const router = express.Router();
const { verifyRefreshToken } = require("../middlewares/authentication");
const {
    register,
    login,
    renewAccessToken,
    logout,
    forgotPassword,
    checkResetToken,
} = require("../controllers/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/refresh-token").post(verifyRefreshToken, renewAccessToken);
router.route("/logout").post(logout);
router.route("/forgot-password").get(forgotPassword);
router.route("/reset-password").put(checkResetToken);

module.exports = router;
