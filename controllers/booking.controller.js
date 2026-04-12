import { errorResponceBody, successResponceBody } from "../utils/responce.js"
import { STATUS_CODE } from "../utils/constant.js"
import * as bookingService from "../services/booking.service.js"

export const createBooking = async (req, res) => {
    try {
        let userId = req.userId;
        // { { ...req.body, userId: userId } if you dont understand go and know about this is very important conscept in js}
        const response = await bookingService.createBooking({ ...req.body, userId: userId })
        successResponceBody.message = "successfully create a booking";
        successResponceBody.data = response;

        return res.status(STATUS_CODE.CREATED).json(successResponceBody)
    } catch (error) {
        console.log(error)

        if (error.err) {
            errorResponceBody.err = error.err;
            return res.status(error.code).json(errorResponceBody)
        }

        errorResponceBody.err = error;
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponceBody)
    }
}