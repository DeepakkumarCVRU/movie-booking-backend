import Theatre from "../model/theatre.model.js";

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
