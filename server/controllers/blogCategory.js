const B_Category = require("../models/blogCategory");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors/");

const getAllCate = asyncHandler(async (req, res) => {
    const category = await B_Category.find();

    return res.status(StatusCodes.OK).json(category);
});

const createCategory = asyncHandler(async (req, res) => {
    const category = await B_Category.create(req.body);

    return res.status(StatusCodes.OK).json({
        category,
    });
});

const getCate = asyncHandler(async (req, res) => {
    const { bcid } = req.params;
    const category = await B_Category.findById(bcid);

    if (!category) {
        throw new NotFoundError("No product category with that id");
    }

    return res.status(StatusCodes.OK).json({
        category,
    });
});

const updateCategory = asyncHandler(async (req, res) => {
    const { bcid } = req.params;

    const updatedCategory = await B_Category.findByIdAndUpdate(bcid, req.body, {
        runValidators: true,
        new: true,
    });

    if (!updatedCategory) {
        throw new NotFoundError("No product category with that id to update");
    }

    return res.status(StatusCodes.OK).json({
        updatedCategory,
    });
});

const deleteCategory = asyncHandler(async (req, res) => {
    const { bcid } = req.params;

    const deletedCategory = await B_Category.findByIdAndDelete(bcid, req.body, {
        runValidators: true,
        new: true,
    });

    if (!deletedCategory) {
        throw new NotFoundError("No product category with that id to delete");
    }

    return res.status(StatusCodes.OK).json({
        deletedCategory,
    });
});

module.exports = {
    createCategory,
    getAllCate,
    getCate,
    updateCategory,
    deleteCategory,
};
