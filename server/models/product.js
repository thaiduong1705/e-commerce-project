const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		// đồng hồ apple - dong-ho-apple
		slug: {
			type: String,
			slug: "title",
			slugPaddingSize: 4,
			unique: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		brand: {
			type: String,
			required: true,
			trim: true,
		},
		category: {
			type: String,
			required: true,
			default: "Smartphone",
		},
		price: {
			type: Number,
			required: true,
		},
		quantity: {
			type: Number,
			default: 0,
		},
		soldQuantity: {
			type: Number,
			default: 0,
		},
		images: {
			type: Array,
		},
		color: {
			type: [String],
			default: ["black", "white"],
		},
		ratings: [
			{
				star: { type: Number },
				postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
				comment: String,
			},
		],
		avgRating: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Product", productSchema);
