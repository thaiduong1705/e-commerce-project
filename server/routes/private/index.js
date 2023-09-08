const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const adminRouter = require("./admin");

const { isAdmin } = require("../middlewares/authentication");

// admin routes
router.use("/admin", isAdmin, adminRouter);

// user routes
router.use("/no-admin", userRouter);

module.exports = router;
