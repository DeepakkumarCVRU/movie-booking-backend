import { errorResponceBody } from "../utils/responce.js";


/**
 * validator for user sign Up
 * @param req --> http request object
 * @param res --> http response object
 * @param next --> next middleware
*/

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

    //  request is valid
    next();

}

/**
 * validator for user sign In
 * @param req --> http request object
 * @param res --> http response object
 * @param next --> next middleware
*/

export const validateSignInRequest = (req, res, next) => {
    if (!req.body.email) {
        errorResponceBody.err = "No Email provided for sign in";
        return res.status(400).json(errorResponceBody)
    }
    if (!req.body.password) {
        errorResponceBody.err = "No Password provided for sign in";
        return res.status(400).json(errorResponceBody)
    }

    // request is valid
    next();
}