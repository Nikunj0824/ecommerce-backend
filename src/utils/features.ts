import mongoose from "mongoose";

const uri = "";

export const connectDB = () => {
    mongoose
        .connect(uri)
        .then(con => console.log(`DB connected to ${con.connection.host}`))
        .catch(err => console.log(err));
}