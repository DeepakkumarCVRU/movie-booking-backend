import { errorResponceBody, successResponceBody } from "../utils/responce.js"
import * as userService from "../services/user.service.js"
export const signUp = async (req, res) => {
    try {
        const response = await userService.createUser(req.body)
        successResponceBody.data = response;
        successResponceBody.message = " user created successfully ";
        return res.status(201).json(successResponceBody);
    } catch (error) {
        if (error.err) {
            errorResponceBody.err = error.err;
            return res.status(error.code).json(errorResponceBody)
        }

        errorResponceBody.err = error
        return res.status(500).json(errorResponceBody)
    }
}