import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { BaseQuery, NewProductRequestBody, SearchRequestQuery } from "../types/type.js"
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";


export const newProduct = TryCatch(
    async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
        const { name, imageUrl, price, description, stock, category } = req.body;

        if (!name || !imageUrl || !price || !description || !stock || !category) {
            next(new ErrorHandler("Please fill all data", 400));
        }

        await Product.create({ name, imageUrl, price, description, stock, category: category.toLocaleLowerCase() });

        return res.status(201).json({
            success: true,
            message: "Product created successfully"
        });
    }
);

export const getLatestProducts = TryCatch(
    async (req, res, next) => {
        const products = Product.find({}).sort({ createdAt: -1 }).limit(5);
        res.status(200).json({
            success: true,
            products
        });
    }
);

export const getAllCategories = TryCatch(
    async (req, res, next) => {
        const categories = Product.distinct("category");

        return res.status(200).json({
            success: true,
            categories
        });
    }
);



export const getProduct = TryCatch(
    async (req, res, next) => {
        const id = req.params.id;
        const product = await Product.findById(id);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        return res.status(200).json({
            success: true,
            product
        });
    }
);

export const updateProduct = TryCatch(
    async (req, res, next) => {
        const id = req.params.id;
        const { name, imageUrl, price, description, stock, category } = req.body;

        const product = await Product.findById(id);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        if (name) product.name = name;
        if (imageUrl) product.imageUrl = imageUrl;
        if (price) product.price = price;
        if (description) product.description = description;
        if (stock) product.stock = stock;
        if (category) product.category = category;

        await product.save();

        return res.status(200).json({
            success: true,
            message: "Product updated successfully"
        });
    }
);

export const deleteProduct = TryCatch(
    async (req, res, next) => {
        const id = req.params.id;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "Product has been deleted"
        });
    }
);

export const getAllProducts = TryCatch(
    async (req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {
        const { search, price, category, sort } = req.query;
        const page = req.query.page || 1;

        const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
        const skip = limit * (page - 1);

        const baseQuery: BaseQuery = {}

        if (search) {
            baseQuery.name = {
                $regex: search,
                $options: "i"
            };
        }
        if (price) {
            baseQuery.price = {
                $lte: price,

            }
        }
        if (category) {
            baseQuery.category = category;
        }

        const [products, allSearchProducts] = await Promise.all([
            Product.find(baseQuery)
                .sort(sort && { price: (sort === "asc" ? 1 : -1) })
                .limit(limit)
                .skip(skip),
            Product.find(baseQuery)
        ]);

        const totalPage = Math.ceil(allSearchProducts.length / limit);

        return res.status(200).json({
            success: true,
            products,
            totalPage
        });
    }
);