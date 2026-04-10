import jwt from "jsonwebtoken"
import { errorResponceBody } from "../utils/responce.js";
import { getUserById } from "../services/user.service.js";

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

export const IsAuthenticated = async (req, res, next) => {

    try {
        const token = await req.headers["x-access-token"];
        console.log(token)
        if (!token) {
            errorResponceBody.err = "No token provided";
            return res.status(403).json(errorResponceBody)
        }

        const response = jwt.verify(token, process.env.SECRET_KEY)
        if (!response) {
            errorResponceBody.err = "Token is not verified";
            return res.status(401).json(errorResponceBody)
        }

        const user = await getUserById(response.id)

        req.user = req.id;
        next()

    } catch (error) {
        console.log(error);

        if (error.name == "JsonWebTokenError") {
            errorResponceBody.err = error.message;

            return res.status(401).json(errorResponceBody)
        }

        if (error.err) {
            errorResponceBody.err = error.err;
            errorResponceBody.message = "User not found";
            return res.status(error.code).json(errorResponceBody)
        }
        errorResponceBody.err = error;
        return res.status(500).json(errorResponceBody)
    }





}