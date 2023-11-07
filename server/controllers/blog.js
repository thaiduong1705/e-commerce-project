const Blog = require("../models/blog");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/");
const slugify = require("slugify");

const createBlog = asyncHandler(async (req, res) => {
	const { title, description, category } = req.body;

	if (!title || !description || !category) {
		throw BadRequestError("Missing input. Please check");
	}

	const newBlog = await Blog.create(req.body);

	return res.status(StatusCodes.CREATED).json({
		newBlog,
	});
});

const updateBlog = asyncHandler(async (req, res) => {
	const { bid } = req.params;

	if (Object.keys(req.body).length === 0) {
		throw BadRequestError("Missing inputs");
	}

	const updateBlog = await Blog.findByIdAndUpdate(bid, req.body, {
		new: true,
		runValidators: true,
	});

	return res.status(StatusCodes.OK).json({
		updateBlog,
	});
});

const getBlogs = asyncHandler(async (req, res) => {
	const blogs = await Blog.find();

	return res.status(StatusCodes.OK).json({
		blogs,
	});
});

const getOneBlog = asyncHandler(async (req, res) => {
	const { bid } = req.params;

	const blog = await Blog.findByIdAndUpdate(bid, { $inc: { numberView: 1 } }, { new: true })
		.populate("likes", "firstName lastName")
		.populate("dislikes", "firstName lastName");

	return res.status(StatusCodes.OK).json({
		blog,
	});
});

const deleteBlog = asyncHandler(async (req, res) => {
	const { bid } = req.params;

	const blog = await Blog.findByIdAndDelete(bid);

	return res.status(StatusCodes.OK).json({
		status: 200,
		blog,
	});
});

// LIKE
// DISLIKE
// Khi 1 người dùng tương tác blog thì:
// 1. Check người đó trước đó có dislike k (có thì bỏ dis)
// 2.

const likeBlog = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const { bid } = req.params;
	if (!bid) {
		throw new BadRequestError("Missing blog id");
	}

	const blog = await Blog.findById(bid);

	const alreadyDislike = blog.dislikes.find((u) => u.toString() === _id);

	if (alreadyDislike) {
		blog.dislikes = blog.dislikes.filter((u) => u !== alreadyDislike);
		await blog.save();

		return res.status(StatusCodes.OK).json({
			updateBlog: blog,
		});
	}

	const alreadyLike = blog.likes.find((u) => u.toString() === _id);

	if (alreadyLike) {
		blog.likes = blog.likes.filter((u) => u !== alreadyLike);
		await blog.save();

		return res.status(StatusCodes.OK).json({
			updateBlog: blog,
		});
	} else {
		blog.likes.push(_id);
		await blog.save();

		return res.status(StatusCodes.OK).json({
			updateBlog: blog,
		});
	}
});

const dislikeBlog = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const { bid } = req.params;
	if (!bid) {
		throw new BadRequestError("Missing blog id");
	}

	const blog = await Blog.findById(bid);

	const alreadyLike = blog.likes.find((u) => u.toString() === _id);

	if (alreadyLike) {
		blog.likes = blog.likes.filter((u) => u !== alreadyLike);
		await blog.save();

		return res.status(StatusCodes.OK).json({
			updateBlog: blog,
		});
	}

	const alreadyDislike = blog.likes.find((u) => u.toString() === _id);

	if (alreadyDislike) {
		blog.dislikes = blog.dislikes.filter((u) => u !== alreadyDislike);
		await blog.save();

		return res.status(StatusCodes.OK).json({
			updateBlog: blog,
		});
	} else {
		blog.dislikes.push(_id);
		await blog.save();

		return res.status(StatusCodes.OK).json({
			updateBlog: blog,
		});
	}
});

const updateImageBlog = asyncHandler(async (req, res) => {
	const { bid } = req.params;
	console.log(req);
	if (req.file) {
		throw new BadRequestError("Missing Images");
	}

	const updatedBlog = await Blog.findByIdAndUpdate(bid, { $push: { images: req.file.path } }, { new: true });
	return res.status(StatusCodes.OK).json({
		updatedBlog,
	});
});
module.exports = { createBlog, updateBlog, getBlogs, likeBlog, dislikeBlog, getOneBlog, deleteBlog, updateImageBlog };
