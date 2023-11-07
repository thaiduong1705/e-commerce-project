const Product = require("../models/product");
const ProductCategory = require("../models/productCategory");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors/");
const ecommerceData = require("../data/ecommerce.json");
const cateBrand = require("../data/brand");

const insertProduct = asyncHandler(async (req, res) => {
	// await Product.create({
	// 	title: product.name,
	// 	slug: slugify(product.name),
	// 	description: product.description,
	// 	brand: product.brand,
	// 	price: Math.round(Number(product.price.replace(/\D/g, "")) / 1000) * 1000,
	// 	category: product.category,
	// 	quantity: Math.round(Math.random() * 1000),
	// 	soldQuantity: Math.round(Math.random() * 100),
	// 	images: product.images,
	// 	color: product.variants
	// 		.find((variant) => variant.label === "Color")
	// 		.variants.map((element) => {
	// 			return element.toLowerCase();
	// 		}),
	// });

	for (const data of ecommerceData) {
		await Product.create({
			title: data?.name,
			description: data?.description.join("\n"),
			brand: data?.brand,
			price: Math.round(Number(data?.price.replace(/\D/g, "")) / 1000) * 1000,
			category: data?.category,
			quantity: Math.round(Math.random() * 1000),
			soldQuantity: Math.round(Math.random() * 100),
			images: data?.images,
			color: data?.variants?.find((variant) => variant.label === "Color")?.variants?.map((el) => el.toLowerCase()),
		});
	}
	return res.status(StatusCodes.CREATED).json("Oke");
});

const insertProductCate = asyncHandler(async (req, res) => {
	// await Product.create({
	// 	title: product.name,
	// 	slug: slugify(product.name),
	// 	description: product.description,
	// 	brand: product.brand,
	// 	price: Math.round(Number(product.price.replace(/\D/g, "")) / 1000) * 1000,
	// 	category: product.category,
	// 	quantity: Math.round(Math.random() * 1000),
	// 	soldQuantity: Math.round(Math.random() * 100),
	// 	images: product.images,
	// 	color: product.variants
	// 		.find((variant) => variant.label === "Color")
	// 		.variants.map((element) => {
	// 			return element.toLowerCase();
	// 		}),
	// });

	for (const data of cateBrand) {
		await ProductCategory.create({
			title: data.cate,
			brands: data.brands,
		});
	}
	return res.status(StatusCodes.CREATED).json("Oke");
});

module.exports = { insertProduct, insertProductCate };
