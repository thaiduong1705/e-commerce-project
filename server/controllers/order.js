const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");
const Coupon = require("../models/Coupon");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/");
const slugify = require("slugify");

const createOrder = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const { couponId } = req.body;
	const user = await User.findById(_id).select("cart").populate("cart.product", "title price");
	const products = user.cart.map((obj) => {
		return {
			productId: obj.product._id,
			quantity: obj.quantity,
			color: obj.color,
		};
	});
	let totalCost = user.cart.reduce((prev, current) => {
		return current.product.price * current.quantity + prev;
	}, 0);

	let coupon = null;
	if (couponId) {
		coupon = await Coupon.findById(couponId);
		if (coupon) {
			totalCost = Math.round((totalCost * (1 - coupon.discount / 100)) / 1000) * 1000;
		}
	}

	const newOrder = await Order.create({
		products,
		total: totalCost,
		coupon: coupon._id,
		orderBy: _id,
	});
	return res.status(StatusCodes.CREATED).json({
		newOrder,
	});
});

const updateStatus = asyncHandler(async (req, res) => {
	const { oid } = req.params;
	const { status } = req.body;

	const order = await Order.findByIdAndUpdate(oid, { status }, { new: true });

	return res.status(StatusCodes.OK).json({
		order,
	});
});

const getUserOrder = asyncHandler(async (req, res) => {
	const { _id } = req.user;

	const order = await Order.find({ orderBy: _id });

	return res.status(StatusCodes.OK).json({
		order,
	});
});

const getAllOrder = asyncHandler(async (req, res) => {
	const orders = await Order.find().populate("coupon").populate("orderBy", "firstName lastName");

	return res.status(StatusCodes.OK).json({
		orders,
	});
});

module.exports = {
	createOrder,
	updateStatus,
	getUserOrder,
	getAllOrder,
};
