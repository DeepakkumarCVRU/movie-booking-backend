import Movie from "../model/Movie.model.js";



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
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
        return {
            error: "no movie found for the corrsponding id provided",
            code: 404
        }
    }
    return movie;
}