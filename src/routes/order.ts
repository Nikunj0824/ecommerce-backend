import express from "express";
import { allOrders, deleteOrder, getOrder, myOrders, newOrder, processOrder, updateOrder } from "../controllers/order.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

// routes

// /api/v1/order/new
app.post("/new", newOrder);

// /api/v1/order/my
app.get("/my", myOrders);

// /api/v1/order/all
app.get("/all", adminOnly, allOrders);

// /api/v1/order/:id
app.route("/:id").get(getOrder).put(adminOnly, processOrder).delete(adminOnly, deleteOrder);

export default app;