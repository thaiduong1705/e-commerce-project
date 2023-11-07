const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const couponSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            index: true,
            uppercase: true,
        },
        discount: {
            type: Number,
            required: true,
        },
        expire: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Coupon", couponSchema);
