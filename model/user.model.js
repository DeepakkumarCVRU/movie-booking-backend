import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        requied: true,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please fill a valid email '],
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        requird: true,
        minLength: 6
    },

    userType: {
        type: String,
        requied: true,
        default: "CUSTOMER"
    },
    userStatus: {
        type: String,
        required: true,
        default: "APPROVED"
    }
}, { timestamps: true })

const userModel = mongoose.model("User ", userSchema)
export default userModel;