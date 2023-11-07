const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		role: {
			type: String,
			default: "user",
			enum: ["user", "admin"],
		},
		cart: [
			{
				product: { type: mongoose.Types.ObjectId, ref: "Product" },
				quantity: Number,
				color: String,
			},
		],
		address: [
			{
				type: String,
			},
		],
		wishlist: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Product",
			},
		],
		isBlocked: {
			type: Boolean,
			default: false,
		},
		refreshToken: {
			type: String,
			default: "",
		},
		passwordChangedAt: {
			type: String,
		},
		passwordResetToken: {
			type: String,
		},
		passwordResetExpired: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		const salt = bcrypt.genSaltSync(10);
		this.password = await bcrypt.hash(this.password, salt);
	}
	next();
});

userSchema.methods.validatePassword = async function (password) {
	const res = await bcrypt.compare(password, this.password);
	return res;
};

userSchema.methods.createJWT = function (lifetime) {
	return jwt.sign({ _id: this._id, role: this.role }, process.env.SECRET_KEY, {
		expiresIn: lifetime,
	});
};

userSchema.methods.createPasswordResetToken = async function () {
	const randomKey = Math.floor(100000 + Math.random() * 900000);
	this.passwordResetToken = randomKey.toString();
	this.passwordResetExpired = Date.now() + 30 * 60 * 1000;
	await this.save();
	return randomKey;
};
module.exports = mongoose.model("User", userSchema);
