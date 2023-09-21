const P_Category = require("../models/productCategory");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors/");

const getAllPCate = asyncHandler(async (req, res) => {
    const pCates = await P_Category.find();

    return res.status(StatusCodes.OK).json(pCates);
});

const createPCategory = asyncHandler(async (req, res) => {
    const pCate = await P_Category.create(req.body);

    return res.status(StatusCodes.OK).json({
        pCate,
    });
});

const getPCate = asyncHandler(async (req, res) => {
    const { pcid } = req.params;
    const category = await P_Category.findById(pcid);

    if (!category) {
        throw new NotFoundError("No product category with that id");
    }

    return res.status(StatusCodes.OK).json({
        category,
    });
});

const updatePCategory = asyncHandler(async (req, res) => {
    const { pcid } = req.params;

    const updatedCategory = await P_Category.findByIdAndUpdate(pcid, req.body, {
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

const deletePCategory = asyncHandler(async (req, res) => {
    const { pcid } = req.params;

    const deletedCategory = await P_Category.findByIdAndDelete(pcid, req.body, {
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
    createPCategory,
    getAllPCate,
    getPCate,
    updatePCategory,
    deletePCategory,
};
