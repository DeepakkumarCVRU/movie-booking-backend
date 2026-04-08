import { errorResponceBody, successResponceBody } from "../utils/responce.js"
import * as userService from "../services/user.service.js"
export const signUp = async (req, res) => {
    try {
        const response = await userService.createUser(req.body)
        successResponceBody.data = response;
        successResponceBody.message = " user created successfully ";
        return res.status(201).json(successResponceBody);
    } catch (error) {
        errorResponceBody.err = error;
        errorResponceBody.message = " something went wrong "
        return res.status(500).json(errorResponceBody)
    }
}