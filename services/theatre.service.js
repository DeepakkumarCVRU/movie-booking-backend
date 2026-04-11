import Theatre from "../model/theatre.model.js";
import { STATUS_CODE } from "../utils/constant.js";

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
            throw { err: err, code: STATUS_CODE.UNPROCESSABLE_ENTITY }
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
            throw {
                err: "no theatre found for the corrsponding id provided",
                code: STATUS_CODE.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const getAllTheatre = async (data) => {
    try {

        let query = {};
        let pagination = {};
        if (data && data.city) {
            // this checks whether city is present in query params or not
            query.city = data.city;
        }

        if (data && data.pincode) {
            // this checks whether pincode is present in query params or not
            query.pincode = data.pincode;
        }
        if (data && data.name) {
            // this checks whether name is present in query params or not
            query.name = data.name;
        }

        if (data && data.movieId) {

            // query.movie = data.movieId;

            // {or} you can write up this way or down this way 

            query.movie = { $all: data.movieId }

            // or 

            //query .movie = {$all:[data.movieId]}
        }

        if (data && data.limit) {
            pagination.limit = data.limit;
        }
        if (data && data.skip) {
            // let perpage = data.perpage ? data.perpage : 5

            // for first page we send skip as 0
            let perpage = data.limit ? data.limit : 5
            pagination.skip = data.skip * perpage;
        }
        const response = await Theatre.find(query, {}, pagination);
        return response;
    } catch (error) {
        console.log("this from error in theatre .services ", error)
        throw error
    }
}

export const deleteTheatreById = async (id) => {
    try {
        const response = await Theatre.findByIdAndDelete(id)
        if (!response) {
            throw {
                err: "No record of a theatre found for the given id",
                code: STATUS_CODE.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateMovieInTheatre = async (theatreId, movieIds, insert) => {
    try {


        let theatres;

        if (insert) {
            theatres = await Theatre.findByIdAndUpdate(
                theatreId,
                { $addToSet: { movie: { $each: movieIds } } },
                { returnDocument: "after" }
            );
        } else {
            theatres = await Theatre.findByIdAndUpdate(
                theatreId,
                { $pull: { movie: { $in: movieIds } } },
                { returnDocument: "after" }
            );
        }

        if (!theatres) {
            return {
                error: "no such theatre found for the id provided",
                code: STATUS_CODE.NOT_FOUND
            }
        }

        await theatres.save();
        await theatres.populate("movie")
        return theatres;



    } catch (error) {

        if (error.name == "TypeError") {
            return {
                error: "no such theatre found for the id provided , check the id and try again",
                code: STATUS_CODE.NOT_FOUND
            }
        }

        if (error.name == "CastError") {
            return {
                error: "theatre id is not valid , check the id and try again",
                code: STATUS_CODE.NOT_FOUND
            }
        }

        console.log(error)
        throw error
    }
}


export const updateTheatre = async (id, data) => {
    try {
        const response = await Theatre.findByIdAndUpdate(id, data,
            { returnDocument: "after" }
        );

        if (!response) {
            return {
                err: "No record of a theatre found for the given id",
                code: STATUS_CODE.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        if (error.name == "ValidationError") {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message
            })
            return { err: err, code: STATUS_CODE.UNPROCESSABLE_ENTITY }
        } else {
            console.log(error)
            throw error
        }
    }
}

export const getMoviesInATheatre = async (id) => {
    try {
        const theatre = await Theatre.findById(id, { name: 1, movie: 1, address: 1 }).populate("movie");
        if (!theatre) {
            return {
                err: "no theatre with the  given id found ",
                code: STATUS_CODE.NOT_FOUND
            }
        }
        return theatre;
    } catch (error) {
        if (error.name == "CastError") {
            return {
                err: "this theatre id is not valid , check the id and try again",
                code: STATUS_CODE.NOT_FOUND
            }
        }
        console.log(error)
        throw error;
    }
}


export const checkMovieInATheatre = async (theatreId, movieId) => {
    try {

        let response = await Theatre.findById(theatreId)
        if (!response) {
            return {
                err: "no theatre with the  given id found  ",
                code: STATUS_CODE.NOT_FOUND
            }
        }

        // {do you understnad this if not , then google it or watch a video on youtube about it and know more for better understanding of this}
        return response.movie.indexOf(movieId) != -1;
    } catch (error) {
        console.log(error);
        throw error;
    }
}