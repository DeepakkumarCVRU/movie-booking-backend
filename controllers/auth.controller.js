import { errorResponceBody, successResponceBody } from "../utils/responce.js"
import * as userService from "../services/user.service.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import userModel from "../model/user.model.js"


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

export const signIn = async (req, res) => {

    try {
        const user = await userService.getUserByEmail(req.body.email)
        const isValidPassword = await user.isValidPassword(req.body.password)

        if (!isValidPassword) {
            throw { err: "Invalid password for the given email ", code: 401 }
        }

        const token = jwt.sign(
            { id: user.id, email: req.body.email },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        )

        successResponceBody.data = {
            email: user.email,
            role: user.userType,
            status: user.userStatus,
            token: token
        }
        successResponceBody.message = "Successfully logged In";
        return res.status(200).json(successResponceBody)


    } catch (error) {
        console.log(error)
        if (error.err) {
            errorResponceBody.err = error.err;
            return res.status(error.code).json(errorResponceBody)
        }
        errorResponceBody.err = error;
        return res.status(500).json(errorResponceBody)
    }
}

export const resetPassword = async (req, res) => {
    try {
        const user = await userService.getUserById(req.userId)
        const IsValidPassword = await user.isValidPassword(req.body.oldPassword)

        if (!IsValidPassword) {
            throw { err: " Invalid old password , please write the correct old password", code: 403 }
        }
        user.password = req.body.newPassword;
        await user.save()

        successResponceBody.data = user;
        successResponceBody.message = "Successfully updated the password";
        return res.status(200).json(successResponceBody)

    } catch (error) {
        console.log(error)

        if (error.err) {
            errorResponceBody.err = error.err;
            return res.status(error.code).json(errorResponceBody)
        }
        errorResponceBody.err = error;
        res.status(500).json(errorResponceBody)
    }
}