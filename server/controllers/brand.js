const Brand = require("../models/brand");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors/");

const getAllBrand = asyncHandler(async (req, res) => {
    const brands = await Brand.find();

    return res.status(StatusCodes.OK).json(brands);
});

const createBrand = asyncHandler(async (req, res) => {
    const brand = await Brand.create(req.body);

    return res.status(StatusCodes.OK).json({
        brand,
    });
});

const getBrand = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    const brand = await Brand.findById(bid);

    if (!brand) {
        throw new NotFoundError("No product Brand with that id");
    }

    return res.status(StatusCodes.OK).json({
        brand,
    });
});

const updateBrand = asyncHandler(async (req, res) => {
    const { bid } = req.params;

    const updatedBrand = await Brand.findByIdAndUpdate(bid, req.body, {
        runValidators: true,
        new: true,
    });

    if (!updatedBrand) {
        throw new NotFoundError("No product Brand with that id to update");
    }

    return res.status(StatusCodes.OK).json({
        updatedBrand,
    });
});

const deleteBrand = asyncHandler(async (req, res) => {
    const { bid } = req.params;

    const deletedBrand = await Brand.findByIdAndDelete(bid, req.body, {
        runValidators: true,
        new: true,
    });

    if (!deletedBrand) {
        throw new NotFoundError("No product Brand with that id to delete");
    }

    return res.status(StatusCodes.OK).json({
        deletedBrand,
    });
});

module.exports = {
    createBrand,
    getAllBrand,
    getBrand,
    updateBrand,
    deleteBrand,
};
