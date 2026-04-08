import userModel from "../model/user.model.js";

export const createUser = async (userData) => {
    try {
        const response = await userModel.create(userData)
        return response;
    } catch (error) {
        console.log(error)
        throw error;
    }
}