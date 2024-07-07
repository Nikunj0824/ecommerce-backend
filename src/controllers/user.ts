import { Request } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/type.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";

export const newUser = TryCatch(
    async (req: Request<{}, {}, NewUserRequestBody>, res, next) => {
        const { _id, name, email, imageUrl, gender, dob } = req.body;

        let user = await User.findById(_id);

        if (user) {
            return res.status(200).json({
                success: true,
                message: `Welcome ${user.name}`
            })
        }

        if (!_id || !name || !email) {
            return next(new ErrorHandler("Please fill all data", 400));
        }

        user = await User.create({ _id, name, email, imageUrl, gender, dob });

        return res.status(201).json({
            success: true,
            message: `Welcome ${user.name}`
        });
    }
);

export const getAllUsers = TryCatch(async (req, res, next) => {
    const users = await User.find({});

    return res.status(200).json({
        success: true,
        users
    });
});

export const getUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
        return next(new ErrorHandler("Invalid id", 400));
    }

    return res.status(200).json({
        success: true,
        user
    });
});

export const deleteUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
        next(new ErrorHandler("Invalid id", 400));
    }

    return res.status(200).json({
        success: true,
        message: "User has been deleted"
    });
});