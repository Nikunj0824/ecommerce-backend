import { NextFunction, Request, Response } from "express";



export interface NewUserRequestBody {
    _id: string;
    name: string;
    email: string;
    imageUrl?: string;
    gender?: string;
    dob?: Date;
};

export interface NewProductRequestBody {
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    stock: number;
    category: string;
};

export type ShippingInfo = {
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
};

export type OrderItem = {
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
    productId: string;
};

export type BillSummary = {
    subTotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
};

export interface NewOrderRequestBody {
    status: string;
    shippingInfo: ShippingInfo;
    user: string;
    orderItems: [OrderItem];
    billSummary: BillSummary;
};

export type ControllerType = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>

export type SearchRequestQuery = {
    search?: string;
    price?: number;
    category?: string;
    sort?: string;
    page?: number;
};

export interface BaseQuery {
    name?: {
        $regex: String;
        $options: String;
    };
    price?: { $lte: Number };
    category?: String;
};

export type InvalidateCache = {
    product?: boolean;
    order?: boolean;
    admin?: boolean;
    userId?: string;
};