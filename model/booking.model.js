import mongoose from "mongoose";
import { BOOKING_STATUS } from "../utils/constant.js";

const bookingSchema = new mongoose.Schema({
    theatreId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "theatre"
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Movie"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    timings: {
        type: String,
        required: true
    },
    noOfSeat: {
        type: Number,
        required: true
    },
    totalCost: {
        type: Number,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: [BOOKING_STATUS.canclled, BOOKING_STATUS.processing, BOOKING_STATUS.successfull],
            message: "invalid booking status"
        },
        default: BOOKING_STATUS.processing
    }

}, { timestamps: true })


const Booking = mongoose.model("Booking", bookingSchema)
export default Booking