import mongoose from "mongoose";
import { PAYMENT_STATUS } from "../utils/constant.js";

const paymentModel = new mongoose.Schema({
    bookingId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: [PAYMENT_STATUS.failed, PAYMENT_STATUS.pending, PAYMENT_STATUS.success],
            message: "Invalid payment status"
        },
        default: PAYMENT_STATUS.pending
    }
}, { timestamps: true })

const payment = mongoose.model("payment", paymentModel)
export default payment

