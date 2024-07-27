import { TryCatch } from "../middlewares/error.js";
import { Coupon } from "../models/coupon.js";
import ErrorHandler from "../utils/utility-class.js";


export const newCoupon = TryCatch(async (req, res, next) => {
    const { couponCode, amount } = req.body;

    if (!couponCode || !amount) {
        return next(new ErrorHandler("Please enter both details", 400));
    }

    await Coupon.create({ couponCode, amount });

    return res.status(201).json({
        success: true,
        message: "Coupon created successfully"
    });
});

export const allCoupons = TryCatch(async (req, res, next) => {
    const coupons = await Coupon.find();

    if (!coupons) {
        return next(new ErrorHandler("No coupons found", 404));
    }

    return res.status(200).json({
        success: true,
        coupons
    });
});

export const deleteCoupon = TryCatch(async (req, res, next) => {
    const { id } = req.params;

    const coupon = await Coupon.findByIdAndDelete(id);

    if (!coupon) {
        return next(new ErrorHandler("Invalid coupon id", 400));
    }

    return res.status(200).json({
        success: true,
        message: "Coupon deleted successfully"
    });
});

export const applyDisount = TryCatch(async (req, res, next) => {
    const { couponCode } = req.params;

    const coupon = await Coupon.findOne({ couponCode });

    if (!coupon) {
        return next(new ErrorHandler("Please enter valid coupon code", 400));
    }

    return res.status(200).json({
        success: true,
        discount: coupon.amount,
        message: "Coupon applied successfully"
    });
});

export const makePayment = TryCatch(async (req, res, next) => { });