const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const orderSchema = new mongoose.Schema({
	products: [
		{
			productId: { type: mongoose.Types.ObjectId, ref: "Product" },
			quantity: Number,
			color: String,
		},
	],
	status: {
		type: String,
		default: "Processing",
		unique: ["Canceled", "Processing", "Successed"],
	},
	paymentIntent: {},
	total: Number,
	coupon: {
		type: mongoose.Types.ObjectId,
		ref: "Coupon",
	},
	orderBy: {
		type: mongoose.Types.ObjectId,
		ref: "User",
	},
});

//Export the model
module.exports = mongoose.model("Order", orderSchema);
