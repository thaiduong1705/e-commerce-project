const mongoose = require("mongoose");

const pCategorySchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},
		brands: {
			type: [String],
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("ProductCategory", pCategorySchema);
