import Movie from "../model/movie.model.js";



export const createMOvie = async (movie) => {
    try {
        const savedMovie = await Movie.create(movie);
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