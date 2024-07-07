import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter product name"]
        },
        imageUrl: {
            type: String,
            required: [true, "Please upload product image"]
        },
        price: {
            type: Number,
            required: [true, "Please add product price"]
        },
        description: {
            type: String,
            required: [true, "Please add product description"]
        },
        stock: {
            type: Number,
            required: [true, "Please add product stock"]
        },
        category: {
            type: String,
            required: [true, "Please add product category"],
            trim: true
        }
    },
    {
        timestamps: true
    }
);

export const Product = mongoose.model("Product", schema);