import { errorResponceBody } from "../utils/responce.js";


export const validateSignUpRequest = async (req, res, next) => {

    // validation of presence of name
    if (!req.body.name) {
        errorResponceBody.err = "Name of the user not present in the request";
        return res.status(400).json(errorResponceBody)
    }

    // validation of presence of email
    if (!req.body.email) {
        errorResponceBody.err = "email of the user not present in the request ";
        return res.status(400).json(errorResponceBody)
    }

    // validation of presence of password
    if (!req.body.password) {
        errorResponceBody.err = "password of the user not present in the request";
        return res.status(400).json(errorResponceBody)
    }

    next();

}