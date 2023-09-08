const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllUser = asyncHandler(async (req, res) => {
    const users = await User.find();
    return res.status(StatusCodes.OK).json(users);
});

const getOneUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
        throw new NotFoundError(`No user with id ${id}`);
    }

    return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        user,
    });
});

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
        throw new NotFoundError(`No user with this id`);
    }
    return res.status(StatusCodes.OK).json({
        success: true,
        msg: `User with email ${user.email} deleted`,
    });
});

const updateUserByAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (Object.keys(req.body) === 0) {
        throw new BadRequestError("Missing update info or user id");
    }
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        runValidators: true,
        new: true,
    }).select("-password");

    if (!updatedUser) {
        throw new NotFoundError(`No user with id: ${id}`);
    }

    return res.status(200).json({
        success: true,
        updatedUser,
    });
});

module.exports = {
    getAllUser,
    getOneUser,
    deleteUser,
    updateUserByAdmin,
};
