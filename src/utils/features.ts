import mongoose from "mongoose";
import { InvalidateCache, OrderItem } from "../types/type.js";
import { Product } from "../models/product.js";
import ErrorHandler from "./utility-class.js";
import { Order } from "../models/order.js";

export const connectDB = (uri: string) => {
    mongoose
        .connect(uri)
        .then(con => console.log(`DB connected to ${con.connection.host}`))
        .catch(err => console.log(err));
};

export const invalidateCache = async ({ product, order, admin, userId }: InvalidateCache) => {
    if (product) {
        const productKeys: string[] = ["latest-products", "categories", "all-products"];
        
        const products = await Product.find({}).select("_id");

        products.forEach(e => {
            productKeys.push(`product-${e._id}`);
        });
        //cache.del(productKeys)
    }
    if (order) {
        const orderKeys: string[] = ["all-orders", `my-orders-${userId}`];
        const orders = await Order.find({}).select("_id");

        orders.forEach(e => {
            orderKeys.push(`order-${e._id}`);
        });
        //cache.del(orderKeys)
    }
    if (admin) { }
};

export const reduceStock = async (orderItems: OrderItem[]) => {
    for (let i = 0; i < orderItems.length; i++) {
        const orderItem = orderItems[i];
        const product = await Product.findById(orderItem.productId);
        if (!product) {
            throw new ErrorHandler("Product not found", 404);
        }
        if (product.stock < orderItem.quantity) {
            throw new ErrorHandler("Product out of stock", 400);
        }
        product.stock -= orderItem.quantity;
    }
};