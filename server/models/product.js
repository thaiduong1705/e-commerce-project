const mongoose = require("mongoose");

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
            required: true,
            unique: true,
            lowercase: true,
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
            type: mongoose.Types.ObjectId,
            ref: "Category",
        },
        quantity: {
            type: Number,
            default: 0,
        },
        soldQuantity: {
            type: Number,
            default: 0,
        },
        quantity: {
            type: Number,
            default: 0,
        },
        images: {
            type: Array,
        },
        color: {
            type: String,
            enum: ["Black", "White"],
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
