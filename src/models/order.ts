import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: [true, "Please enter product name"]
        },
        status: {
            type: String,
            enum: ["Processing", "Shipped", "OutForDelivery", "Delivered"],
            default: "Processing"
        },
        shippingInfo: {
            address: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            },
            pinCode: {
                type: String,
                required: true
            },
        },
        user: {
            type: String,
            ref: "User",
            required: true
        },
        orderItems: [{
            name: String,
            imageUrl: String,
            price: Number,
            quantity: Number,
            productId: {
                type: mongoose.Types.ObjectId,
                ref: "Product",
            },
            required: true
        }],
        billSummary: {
            subTotal: {
                type: Number,
                required: true
            },
            tax: {
                type: Number,
                required: true
            },
            shippingCharges: {
                type: Number,
                required: true
            },
            discount: {
                type: Number,
                required: true
            },
            total: {
                type: Number,
                required: true
            }
        }

    },
    {
        timestamps: true
    }
);

export const Order = mongoose.model("Order", schema);