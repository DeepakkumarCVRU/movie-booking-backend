import Theatre from "../model/theatre.model.js";
import Movie from "../model/movie.model.js";

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
                code: 404
            }
        }

        await theatres.save();
        await theatres.populate("movie")
        return theatres;



    } catch (error) {

        if (error.name == "TypeError") {
            return {
                error: "no such theatre found for the id provided , check the id and try again",
                code: 404
            }
        }

        if (error.name == "CastError") {
            return {
                error: "theatre id is not valid , check the id and try again",
                code: 404
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
                code: 404
            }
        }
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


