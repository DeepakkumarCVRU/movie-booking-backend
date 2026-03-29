import Movie from "../model/Movie.model.js";



/**
 * 
 * @param data -> Object containg details of the new movie to be created  
 * @returns -> return the new movie object created 
*/
export const createMOvie = async (data) => {
    try {
        const savedMovie = await Movie.create(data);
        return savedMovie

    } catch (error) {
        if (error.name == "ValidationError") {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message
            })
            console.log(err)
            return { err: err, code: 422 }
        } else {
            throw error;
        }
    }
}


//*
// * 
// * @param id -> id which will be used to identify the movie to be fetched
// * @returns -> object containing movie fetched
//*/

export const getMovieById = async (id) => {
    const movie = await Movie.findById(id);
    console.log("movie details from services :  ", movie)
    if (!movie) {
        return {
            error: "no movie found for the corrsponding id provided",
            code: 404
        }
    }

    return movie;
}



/**
 * 
 * @param id -> id which will be used to identify the movie to deleted 
 * @returns -> object containing the details of  movie deleted 
*/
export const deleteMovieById = async (id) => {
    try {
        const response = await Movie.findByIdAndDelete(id);
        if (!response) {
            return {
                error: "no movie found for the corrsponding id provided",
                code: 404
            }
        }
        return response;
    } catch (error) {
        console.log(error)
        throw error;
    }

}


/**
 * 
 * @param id -> id which will be used to identify the movie to be updated 
 * @param data -> object that contains actual data which is to be updated in the db
 * @returns -> return the new updated movie details
*/

export const updateMovieById = async (id, data) => {
    try {
        const movie = await Movie.findByIdAndUpdate(id, data, { returnDocument: "after", runValidators: true }) //you can also use { new : true } instead of { returnDocument : "after"}
        return movie;
    } catch (error) {
        if (error.name == "ValidationError") {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message
            })
            console.log(err)
            return { err: err, code: 422 }
        } else {
            throw error;
        }
    }
}



//*
// * 
// * @param filter -> fileter will help us in filtering out data based on condition it contains
// * @returns -> return an object containing all the movie fetched based on the filter
//*/

export const getMovieByName = async (filter) => {
    let query = {};

    if (filter.name) {
        query.name = filter.name
    }


    let movie = await Movie.find(query)
    if (!movie) {
        return {
            err: "not able to find the queries movie",
            code: 404
        }
    }
    return movie;
}