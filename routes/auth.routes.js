import * as authController from "../controllers/auth.controller.js"
import { Router } from "express"

const authRouter = Router()


authRouter.post("/mba/api/v1/auth/signup", authController.signUp)

export default authRouter;
