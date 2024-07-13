import mongoose from "mongoose";
import { InvalidateCache } from "../types/type.js";
import { Product } from "../models/product.js";

const uri = "";

export const connectDB = () => {
    mongoose
        .connect(uri)
        .then(con => console.log(`DB connected to ${con.connection.host}`))
        .catch(err => console.log(err));
};

export const invalidateCache = async ({ product, order, admin }: InvalidateCache) => {
    if (product) {
        const productKeys: string[] = ["latest-products", "categories", "all-products"];

        const products = await Product.find({}).select("_id");
        
        products.forEach(e => {
            productKeys.push(`product-${e._id}`);
        });
        //cache.del(productKeys)
    }
    if (order) { }
    if (admin) { }
};