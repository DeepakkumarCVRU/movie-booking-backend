import Movie from "../model/Movie.model.js";

export const getMovieById = async (id) => {
    const movie = await Movie.findById(id);
    console.log("movie", movie)
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