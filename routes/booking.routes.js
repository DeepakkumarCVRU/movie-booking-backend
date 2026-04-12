import { Router } from "express"
import * as bookingController from "../controllers/booking.controller.js"
import * as authMiddleware from "../middleware/auth.middleware.js"
import * as booking from "../middleware/booking.middleware.js"
const bookingRoute = Router()

bookingRoute.post(
    "/mba/api/v1/bookings",
    authMiddleware.IsAuthenticated,
    booking.validateBookingCreateRequest,
    bookingController.createBooking
)

export default bookingRoute;