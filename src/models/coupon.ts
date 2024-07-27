import mongoose from "mongoose";

const schema = new mongoose.Schema({
    couponCode: {
        type: String,
        required: [true, "Please enter coupon code"],
        unique: true
    },
    amount: {
        type: Number,
        required: [true, "Please enter coupon value"]
    }
})

export const Coupon = mongoose.model("Coupon", schema);