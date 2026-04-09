import userModel from "../model/user.model.js";

export const createUser = async (userData) => {
    try {
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