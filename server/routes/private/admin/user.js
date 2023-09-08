const express = require("express");
const router = express.Router();

const {
    getAllUser,
    getOneUser,
    updateUserByAdmin,
    deleteUser,
} = require("../../../controllers/user");

router.route("/").get(getAllUser);
router.route("/:id").get(getOneUser).put(updateUserByAdmin).delete(deleteUser);

module.exports = router;
