import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewOrderRequestBody } from "../types/type.js";
import { Order } from "../models/order.js";
import { invalidateCache, reduceStock } from "../utils/features.js";
import ErrorHandler from "../utils/utility-class.js";



export const newOrder = TryCatch(async (req: Request<{}, {}, NewOrderRequestBody>, res, next) => {

    const { status, shippingInfo, user, orderItems, billSummary } = req.body;

    if (!status || !shippingInfo || !user || !orderItems || !billSummary) {
        return next(new ErrorHandler("Please fill all data", 400));
    }

    await Order.create({ status, shippingInfo, user, orderItems, billSummary });

    await reduceStock(orderItems);

    invalidateCache({ product: true, order: true, userId: user });

    return res.status(201).json({
        success: true,
        message: "Order placed successfully"
    });
});

export const myOrders = TryCatch(async (req, res, next) => {

    const { userId: user } = req.query;
    const orders = await Order.find({ user });

    if (!orders) {
        return next(new ErrorHandler("No orders found", 404));
    }

    return res.status(200).json({
        success: true,
        orders
    });
});

export const allOrders = TryCatch(async (req, res, next) => {
    const orders = await Order.find({}).populate("user", "name");

    if (!orders) {
        return next(new ErrorHandler("No order found", 404));
    }

    return res.status(200).json({
        success: true,
        orders
    });
});

export const getOrder = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findById(id).populate("user", "name");

    if (!order) {
        return next(new ErrorHandler("Order not found", 404));
    }

    return res.status(200).json({
        success: true,
        order
    });
});

export const processOrder = TryCatch(async (req, res, next) => {

    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
        return next(new ErrorHandler("Order not found", 404));
    }

    switch (order.status) {
        case "Processing":
            order.status = "Shipped";
            break;
        case "Shipped":
            order.status = "OutForDelivery";
            break;
        case "OutForDelivery":
            order.status = "Delivered";
            break;
        default:
            order.status = "Delivered";
            break;
    }

    await order.save();

    await invalidateCache({ order: true, userId: order.user });

    return res.status(201).json({
        success: true,
        message: "Order processed successfully to the next status"
    });
});

export const updateOrder = TryCatch(async (req, res, next) => {

    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
        return next(new ErrorHandler("Order not found", 404));
    }

    order

    return res.status(201).json({
        success: true,
        order
    });
});

export const deleteOrder = TryCatch(async (req, res, next) => {

    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
        return next(new ErrorHandler("Order not found", 404));
    }

    await invalidateCache({ order: true, userId: order.user });

    return res.status(200).json({
        success: true,
        message: "Order deleted successfully"
    });
});