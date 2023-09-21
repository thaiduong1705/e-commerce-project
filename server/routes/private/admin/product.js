const express = require("express");
const router = express.Router();

const {
    getAllProduct,
    createProduct,
    getOneProduct,
    updateProduct,
    deleteProduct,
} = require("../../../controllers/product");

router.route("/").get(getAllProduct).post(createProduct);
router
    .route("/:pid")
    .get(getOneProduct)
    .put(updateProduct)
    .delete(deleteProduct);

module.exports = router;
