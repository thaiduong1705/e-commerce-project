const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getMyProfile = asyncHandler(async (req, res) => {
    const { _id, role } = req.user;

    const user = await User.findOne({ _id }).select(
        "-password -role -refreshToken"
    );

    return res.status(StatusCodes.OK).json(user);
});

const updateMyProfile = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    if (!_id || Object.keys(req.body) === 0) {
        throw new BadRequestError("Missing update info or user id");
    }
    const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
        runValidators: true,
        new: true,
    }).select("-password -role -refreshToken");
    return res.status(200).json({
        success: true,
        updatedUser,
    });
});

module.exports = { getMyProfile, updateMyProfile };
