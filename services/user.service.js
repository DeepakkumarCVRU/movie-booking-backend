import userModel from "../model/user.model.js";
import { USER_STATUS, USER_ROLE } from "../utils/constant.js"

export const createUser = async (userData) => {
    try {

        if (!userData.userRole || userData.userRole == USER_ROLE.customer) {
            if (userData.userStatus && userData.userStatus !== USER_STATUS.aproved) {
                throw { err: "we can not set any other status for costomer", code: 400 }
            }
        }

        if (userData.userRole && userData.userRole !== USER_ROLE.customer) {
            userData.userType = userData.userRole
            userData.userStatus = USER_STATUS.pending;
        }

        const response = await userModel.create(userData)
        return response;
    } catch (error) {

        if (error.name == "ValidationError") {
            let err = {}
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message
            })
            throw { err: err, code: 422 }
        }

        throw error;

    }
}

export const getUserByEmail = async (email) => {
    try {
        const response = await userModel.findOne({ email: email })
        if (!response) {
            throw { err: "No user found for the given email", code: 404 }
        }

        return response;

    } catch (error) {
        console.log(error)
        throw error;
    }
}