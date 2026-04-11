import jwt from "jsonwebtoken"
import { errorResponceBody } from "../utils/responce.js";
import { getUserById } from "../services/user.service.js";
import { STATUS_CODE, USER_ROLE } from "../utils/constant.js";
import * as userService from "../services/user.service.js"
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
        return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponceBody)
    }

    // validation of presence of email
    if (!req.body.email) {
        errorResponceBody.err = "email of the user not present in the request ";
        return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponceBody)
    }

    // validation of presence of password
    if (!req.body.password) {
        errorResponceBody.err = "password of the user not present in the request";
        return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponceBody)
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
        return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponceBody)
    }
    if (!req.body.password) {
        errorResponceBody.err = "No Password provided for sign in";
        return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponceBody)
    }

    // request is valid
    next();
}

export const IsAuthenticated = async (req, res, next) => {

    try {
        const token = await req.headers["x-access-token"];

        if (!token) {
            errorResponceBody.err = "No token provided";
            return res.status(STATUS_CODE.FORBIDDEN).json(errorResponceBody)
        }

        const response = jwt.verify(token, process.env.SECRET_KEY)
        if (!response) {
            errorResponceBody.err = "Token is not verified";
            return res.status(STATUS_CODE.UNAUTHORIZED).json(errorResponceBody)
        }

        const user = await getUserById(response.id)

        req.userId = user.id;
        next()

    } catch (error) {
        console.log(error);

        if (error.name == "JsonWebTokenError") {
            errorResponceBody.err = error.message;

            return res.status(STATUS_CODE.UNAUTHORIZED).json(errorResponceBody)
        }

        if (error.err) {
            errorResponceBody.err = error.err;
            errorResponceBody.message = "User not found";
            return res.status(error.code).json(errorResponceBody)
        }
        errorResponceBody.err = error;
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponceBody)
    }
}


export const validResetPasswordRequest = (req, res, next) => {
    //validate old password
    if (!req.body.oldPassword) {
        errorResponceBody.err = "Missign  old password in the request";
        return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponceBody)
    }

    if (!req.body.newPassword) {
        errorResponceBody.err = "Missign  new password in the request";
        return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponceBody)
    }

    next()
}


export const isAdming = async (req, res, next) => {
    const user = await userService.getUserById(req.userId)

    if (user.userRole != USER_ROLE.admin) {
        errorResponceBody.err = "user is not a admin , cannot process with the request";
        return res.status(STATUS_CODE.FORBIDDEN).json(errorResponceBody)
    }
    next()
}

export const isClient = async (req, res, next) => {
    const user = await userService.getUserById(req.userId)
    if (user.userRole != USER_ROLE.client) {
        errorResponceBody.err = "user is not a client , cannot process with the request";
        return res.status(STATUS_CODE.FORBIDDEN).json(errorResponceBody)
    }
    next()
}

export const isAdminOrClient = async (req, res, next) => {
    const user = await userService.getUserById(req.userId)
    if (user.userRole != USER_ROLE.admin && user.userRole != USER_ROLE.client) {
        errorResponceBody.err = "user is not a admin or client , cannot process with the request";
        return res.status(STATUS_CODE.FORBIDDEN).json(errorResponceBody)
    }
    next()
}