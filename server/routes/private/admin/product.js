const express = require("express");
const router = express.Router();

const { getAllProduct, createProduct, getOneProduct, updateProduct, deleteProduct, updateImageProduct } = require("../../../controllers/product");
const uploader = require("../../../configs/cloudinary");

router.route("/").get(getAllProduct).post(createProduct);
router.route("/:pid").get(getOneProduct).put(updateProduct).delete(deleteProduct);
router.route("/upload-image/:pid").put(uploader.array("image", 10), updateImageProduct);
module.exports = router;
