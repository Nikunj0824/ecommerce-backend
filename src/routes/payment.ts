import express from "express";
import { allCoupons, applyDisount, deleteCoupon, newCoupon } from "../controllers/payment.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

// routes

// /api/v1/payment/coupon/new
app.post("/coupon/new", adminOnly, newCoupon);

// /api/v1/payment/coupon/all
app.get("/coupon/all", adminOnly, allCoupons);

// api/v1/payment/coupon/delete/:id
app.delete("/coupon/delete", adminOnly, deleteCoupon);

// /api/v1/payment/discount/:code
app.post("/discount", applyDisount);


export default app;