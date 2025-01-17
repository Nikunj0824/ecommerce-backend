import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/utility-class.js";
import { ControllerType } from "../types/type.js";


export const errorMiddleware = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {

    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    if (err.name === "CastError") {
        err.message = "Invalid ID"
    }

    return res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};

export function TryCatch(func: ControllerType) {
    return (req: Request, res: Response, next: NextFunction) => {
        return Promise.resolve(func(req, res, next)).catch(next);
    };
};