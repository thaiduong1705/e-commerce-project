const Coupon = require("../models/Coupon");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors/");

const getAllCoupon = asyncHandler(async (req, res) => {
    const coupons = await Coupon.find();

    return res.status(StatusCodes.OK).json(coupons);
});

const createCoupon = asyncHandler(async (req, res) => {
    const coupon = await Coupon.create({
        ...req.body,
        expire: Date.now() + Number(req.body.expire) * 24 * 60 * 60 * 1000,
    });

    return res.status(StatusCodes.OK).json({
        coupon,
    });
});

const getCoupon = asyncHandler(async (req, res) => {
    const { cid } = req.params;
    const category = await Coupon.findById(cid);

    if (!category) {
        throw new NotFoundError("No product category with that id");
    }

    return res.status(StatusCodes.OK).json({
        category,
    });
});

const updateCoupon = asyncHandler(async (req, res) => {
    const { cid } = req.params;

    if (Object.keys(req.body).length === 0) {
        throw new BadRequestError("Missing inputs");
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(
        cid,
        {
            ...req.body,
            expire: Date.now() + Number(req.body.expire) * 24 * 60 * 60 * 1000,
        },
        {
            runValidators: true,
            new: true,
        }
    );

    if (!updatedCoupon) {
        throw new NotFoundError("No product category with that id to update");
    }

    return res.status(StatusCodes.OK).json({
        updatedCoupon,
    });
});

const deleteCoupon = asyncHandler(async (req, res) => {
    const { cid } = req.params;

    const deletedCoupon = await Coupon.findByIdAndDelete(cid, req.body, {
        runValidators: true,
        new: true,
    });

    if (!deletedCoupon) {
        throw new NotFoundError("No product category with that id to delete");
    }

    return res.status(StatusCodes.OK).json({
        deletedCoupon,
    });
});

module.exports = {
    createCoupon,
    getAllCoupon,
    getCoupon,
    updateCoupon,
    deleteCoupon,
};
