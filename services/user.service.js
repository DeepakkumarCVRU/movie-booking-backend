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
        console.log(email)
        const response = await userModel.findOne({ email: email })
        console.log(response)
        if (!response) {
            throw { err: "No user found for the given email", code: 404 }
        }

        return response;

    } catch (error) {
        console.log(error)
        throw error;
    }
}


export const getUserById = async (req, res) => {
    try {
        const response = await userModel.findOne(req.userId)
        if (!response) {
            throw { err: "User not found ", code: 404 }
        }
        return response;
    } catch (error) {
        console.log(error)
        throw error;
    }
}


// this code is not working properly , you can go userModel and find the problem what not working , thank you
/*
export const updateUserRoleOrStatus = async (data, userId) => {
    try {
        const updateQuery = {};
        if (data.userRole) updateQuery.userRole = data.userRole;
        if (data.userStatus) updateQuery.userStatus = data.userStatus;
        if (data.drink) updateQuery.drink = data.drink;



        const response = await userModel.findByIdAndUpdate(
            {
                _id: userId
            }, updateQuery, { returnDocument: "after" })

        if (!response) {
            throw { err: " No user found for the given Id", code: 404 }
        }
        return response;

    } catch (error) {
        console.log(error)
        throw error;
    }
} */