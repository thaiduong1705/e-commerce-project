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
	const { pid } = req.params;

	const product = await Product.findById(pid);

	if (!product) {
		throw new NotFoundError("No product with that pid");
	}

	return res.status(StatusCodes.OK).json({
		product,
	});
});

const updateProduct = asyncHandler(async (req, res) => {
	const { pid } = req.params;

	if (req.body && req.body.title) {
		req.body.slug = slugify(req.body.title);
	}
	const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
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
	const { pid } = req.params;

	const deletedProduct = await Product.findByIdAndDelete(pid);

	if (!deletedProduct) {
		throw new NotFoundError("No product with that pid to delete");
	}

	return res.status(StatusCodes.OK).json({
		deletedProduct,
	});
});

const getFilterProduct = asyncHandler(async (req, res) => {
	const queryObject = {};

	const { numberingFilter, title, brand, sort, field } = req.query;

	// tìm các trường đơn giản cụ thể như là tìm tên, tìm hãng
	if (title) {
		queryObject.title = { $regex: title, $options: "i" };
	}

	if (brand) {
		queryObject.brand = { $regex: title, $options: "i" };
	}

	// filter các trường có thể filter
	if (numberingFilter) {
		const operatorMap = {
			">": "$gt",
			">=": "$gte",
			"=": "$eq",
			"<": "$lt",
			"<=": "$lte",
		};

		const regEx = /\b(<|>|>=|=|<|<=)\b/g;

		let filterString = numberingFilter.replace(regEx, (match) => `-${operatorMap[match]}-`);

		filterString.split(",").forEach((item) => {
			const [field, operator, value] = item.split("-");
			queryObject[field] = { [operator]: value };
		});
	}

	let result = Product.find(queryObject);

	// sort (có trừ đằng trước là từ lớn tới bé, k trừ thì từ bé đến lớn) sort=abc,-def
	if (sort) {
		const sortList = sort.split(",").join(" ");
		result = result.sort(sortList);
	} else {
		result = result.sort("-createdAt");
	}

	// field limit (chọn trường để hiển thị)
	if (field) {
		const fieldSelect = field.split(",").join(" ");
		result = result.select(fieldSelect);
	}

	// phân chia trang
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 2;
	const skip = (page - 1) * limit; // thí dụ mình muốn xem page thứ 2 tức là sản phẩm thứ 10 đến thứ 19 thì mình phải đếm skip tới số 10 bằng cách lấy page - 1 * limit

	result = result.skip(skip).limit(limit);

	const products = await result;
	return res.status(StatusCodes.OK).json({
		count: products.length,
		products,
	});
});

const rate = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const { star, comment, pid } = req.body; // star với pid là bắt buộc, comment có hay không cũng đc

	if (!star || !pid) {
		throw new BadRequestError("Missing số sao & pid");
	}

	const product = await Product.findById(pid);

	const review = product.ratings.find((rating) => {
		return rating.postedBy.toString() === _id;
	}); // kiểm tra xem cái sản phẩm đó với user đó thì thằng đó đã đánh giá cho sản phẩm đó chưa

	let updateReview;
	if (review) {
		// update star & comment
		await Product.updateOne(
			{
				$and: [{ _id: pid }, { ratings: { $elemMatch: review } }],
			},
			{
				$set: {
					"ratings.$.star": star,
					"ratings.$.comment": comment, // $ và $elemMatch đại diện cho phần tử đầu tiên tìm thấy từ $elemMatch
				},
			},
			{ new: true }
		);
		updateReview = await Product.findById(pid);
	} else {
		// create star & comment
		updateReview = await Product.findByIdAndUpdate(
			pid,
			{
				$push: { ratings: { star, comment, postedBy: _id } },
			},
			{ new: true, runValidators: true }
		);
	}

	const avgRating = (updateReview.ratings.reduce((prev, current) => prev + current.star, 0) / updateReview.ratings.length).toFixed(1);

	updateReview.avgRating = avgRating;
	await updateReview.save();

	return res.status(StatusCodes.OK).json({
		updateReview,
	});
});

const updateImageProduct = asyncHandler(async (req, res) => {
	const { pid } = req.params;

	if (req.files.length === 0) {
		throw new BadRequestError("Missing Images");
	}

	const updatedProduct = await Product.findByIdAndUpdate(pid, { $push: { images: { $each: req.files.map((obj) => obj.path) } } }, { new: true });
	return res.status(StatusCodes.OK).json({
		updatedProduct,
	});
});

module.exports = {
	createProduct,
	getAllProduct,
	getOneProduct,
	updateProduct,
	deleteProduct,
	getFilterProduct,
	rate,
	updateImageProduct,
};
