import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { deleteProduct, getAllCategories, getAllProducts, getLatestProducts, getProduct, newProduct, updateProduct } from "../controllers/product.js";

const app = express.Router();

// routes

// /api/v1/product/new
app.post("/new", adminOnly, newProduct);

// /api/v1/product/latest
app.get("/latest", getLatestProducts);

// /api/v1/product/categories
app.get("/categories", getAllCategories);

// /api/v1/product/all
app.get("/all", getAllProducts);

// /api/v1/product/id
app.route("/:id").get(getProduct).put(adminOnly, updateProduct).delete(adminOnly, deleteProduct);

export default app;