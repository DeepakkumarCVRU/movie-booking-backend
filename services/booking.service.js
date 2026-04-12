import Booking from "../model/booking.model.js"
import { STATUS_CODE } from "../utils/constant.js";

export const createBooking = async (data) => {
    try {
        const response = await Booking.create(data);
        return response;
    } catch (error) {
        console.log(error)
        if (error.name == "ValidationError") {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.error[key].message;
            });
            throw { err: err, code: STATUS_CODE.UNPROCESSABLE_ENTITY };
        }

        errorResponceBody.err = error;
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponceBody)
    }
}