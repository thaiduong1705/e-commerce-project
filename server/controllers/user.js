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

const updateUserAddress = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	if (!req.body.address) {
		throw new BadRequestError("Missing address");
	}
	const updatedUser = await User.findByIdAndUpdate(
		_id,
		{ $push: { address: req.body.address } },
		{
			runValidators: true,
			new: true,
		}
	).select("-password -role -refreshToken");

	if (!updatedUser) {
		throw new NotFoundError(`No user with id: ${id}`);
	}

	return res.status(200).json({
		success: true,
		updatedUser,
	});
});

const updateUser = asyncHandler(async (req, res) => {
	const { _id } = req.user;

	if (!_id) {
		throw new BadRequestError("Missing user id");
	}
	if (Object.keys(req.body) === 0) {
		throw new BadRequestError("Missing inputs");
	}
	const updatedUser = await User.findByIdAndUpdate(id, req.body, {
		runValidators: true,
		new: true,
	}).select("-password -role -refreshToken");

	if (!updatedUser) {
		throw new NotFoundError(`No user with id: ${id}`);
	}

	return res.status(200).json({
		success: true,
		updatedUser,
	});
});

const getCurrentUser = asyncHandler(async (req, res) => {
	const { _id } = req.user;

	if (!_id) {
		throw new BadRequestError("Missing user id");
	}
	const currentUser = await User.findById(_id).select("-password -role -refreshToken");

	if (!currentUser) {
		throw new NotFoundError(`No user with id: ${id}`);
	}

	return res.status(200).json({
		success: true,
		currentUser,
	});
});

const updateUserCart = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const { pid, quantity, color } = req.body;

	if (!pid || !quantity || !color) {
		throw new BadRequestError("Missing inputs");
	}

	const user = await User.findById(_id).select("-refreshToken -role -createdAt -updatedAt -passwordChangedAt -role");
	const index = user.cart.findIndex((obj) => obj.product.toString() === pid);
	if (index === -1) {
		user.cart.push({ product: pid, quantity, color });
	} else {
		user.cart[index] = { product: pid, quantity, color };
	}

	await user.save();
	return res.status(StatusCodes.OK).json({
		success: true,
		user,
	});
});
module.exports = {
	getAllUser,
	getOneUser,
	deleteUser,
	updateUserByAdmin,
	updateUserAddress,
	updateUser,
	getCurrentUser,
	updateUserCart,
};
