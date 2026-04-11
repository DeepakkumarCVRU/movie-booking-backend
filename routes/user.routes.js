import * as userController from "../controllers/user.controller.js"
import * as userMiddleware from "../middleware/user.middleware.js"
import { Router } from "express"


const userRoute = Router()
//this code not working properly if you should want to know , then go userModel and know about this, thank you you tube: 3:27 and furthuer

userRoute.patch(
    "/mba/api/v1/user/:id",
    userMiddleware.validateUpdateUserRequest,
    userController.updateUser
)

export default userRoute;