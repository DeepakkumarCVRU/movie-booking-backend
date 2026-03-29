import Theatre from "../model/theatre.model.js";


/**
 * 
 * @param data -> data which will be used to create a theatre
 * @returns -> object containing the details of the theatre created
*/

export const createTheatre = async (data) => {
    try {
        const response = await Theatre.create(data);
        return response;
    } catch (error) {
        if (error.name == "ValidationError") {
            let err = {};

            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message
            })
            return { err: err, code: 422 }
        } else {
            console.log(error)
            throw error
        }


    }
}

export const getTheatre = async (id) => {
    try {
        const response = await Theatre.findById(id);
        if (!response) {
            return {
                error: "no theatre found for the corrsponding id provided",
                code: 404
            }
        }
        return response;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const getAllTheatre = async () => {
    try {
        const response = await Theatre.find({});
        return response;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const deleteTheatreById = async (id) => {
    try {
        const response = await Theatre.findByIdAndDelete(id)
        if (!response) {
            return {
                err: "No record of a theatre found for the given id",
                code: 404
            }
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}