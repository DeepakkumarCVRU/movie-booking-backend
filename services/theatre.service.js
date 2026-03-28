import Theatre from "../model/theatre.model.js";

export const createTheatre = async (data) => {
    try {
        const response = await Theatre.create(data);
        return response;
    } catch (error) {
        console.log(error)
        throw error;
    }
}
