import * as authController from "../controllers/auth.controller.js"
import * as authMiddleware from "../middleware/auth.middleware.js"
import { Router } from "express"

const authRouter = Router()


authRouter.post(
    "/mba/api/v1/auth/signup",
    authMiddleware.validateSignUpRequest,
    authController.signUp
)

export default authRouter;
