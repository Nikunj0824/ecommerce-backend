import mongoose from 'mongoose';
import validator from 'validator';

interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    imageUrl?: string;
    gender?: string;
    dob?: Date;
    createdAt: Date;
    updatedAt: Date;
    // Virtual Attribute
    age?: number;
}
const schema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "Please enter ID"]
    },
    name: {
        type: String,
        required: [true, "Please enter Name"]
    },
    email: {
        type: String,
        unique: [true, "email already exists"],
        required: [true, "Please enter email"],
        validate: {
            validator: validator.isEmail,
            message: "Please enter valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Please enter password"]
    },
    imageUrl: {
        type: String,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    dob: {
        type: Date
    }
}, {
    timestamps: true
});

schema.virtual("age").get(function (this: IUser) {
    if (!this.dob) {
        return undefined;
    }
    const today = new Date();
    const dob = this.dob;
    let age = today.getFullYear() - dob.getFullYear();
    if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
});

export const User = mongoose.model<IUser>("User", schema);