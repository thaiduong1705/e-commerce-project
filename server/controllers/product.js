const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/");
const slugify = require("slugify");

const getAllProduct = asyncHandler(async (req, res) => {
    const products = await Product.find();
    return res.status(StatusCodes.OK).json({ products });
});

const createProduct = asyncHandler(async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        throw new BadRequestError("Missing valid input. Please check");
    }

    if (req.body.title) {
        req.body.slug = slugify(req.body.title, {
            replacement: "-", // replace spaces with replacement character, defaults to `-`
            locale: "vi", // language code of the locale to use
            trim: true,
        });
    }

    const product = await Product.create(req.body);

    return res.status(StatusCodes.OK).json({
        product,
    });
});

const getOneProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
        throw new NotFoundError("No product with that id");
    }

    return res.status(StatusCodes.OK).json({
        product,
    });
});

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (req.body && req.body.title) {
        req.body.slug = slugify(req.body.title);
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        runValidators: true,
        new: true,
    });

    if (!updatedProduct) {
        throw new NotFoundError("No product with that id to update");
    }

    return res.status(StatusCodes.OK).json({
        updatedProduct,
    });
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
        throw new NotFoundError("No product with that id to update");
    }

    return res.status(StatusCodes.OK).json({
        deletedProduct,
    });
});

module.exports = {
    createProduct,
    getAllProduct,
    getOneProduct,
    updateProduct,
    deleteProduct,
};
