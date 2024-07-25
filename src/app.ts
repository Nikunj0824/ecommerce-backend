import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import { config } from "dotenv";
import morgan from "morgan";

// importing routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import orderRoute from "./routes/order.js";


config({
    path: "./.env",
});

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || "";

connectDB(mongoUri);

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("home"));

app.use("/api/v1/user", userRoute);

app.use("/api/v1/product", productRoute);

app.use("/api/v1/order", orderRoute);

app.use(errorMiddleware);

app.listen(port, () => console.log(`server is running @port: ${port}`));