import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";

// importing routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js"

const port = 3000;

connectDB();

const app = express();

app.use(express.json());


app.get("/", (req, res) => res.send("home"));

app.use("/api/v1/user", userRoute);

app.use("/api/v1/product", productRoute);

app.use(errorMiddleware);

app.listen(port, () => console.log(`server is running @port: ${port}`));