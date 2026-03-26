
import Movie from "../model/Movie.model.js"
import * as movieService from "../services/movie.service.js"




const errorResponceBody = {
    err: {},
    data: {},
    message: "something went wrong , cannot process the request",
    success: false
}

const successResponceBody = {
    err: {},
    data: {},
    message: "sucessfully proocess the request",
    success: true
}


export const createMovie = async (req, res) => {
    try {
        const { name, description, casts, trailerurl, langugage, releaseDate, director, releaseStatus } = req.body

        const movie = new Movie({
            name: name,
            description: description,
            casts: casts,
            trailerurl: trailerurl,
            langugage: langugage,
            releaseDate: releaseDate,
            director: director,
            releaseStatus: releaseStatus
        })

        const savedMovie = await movie.save()
        return res.status(201).json({
            sucess: true,
            error: {},
            data: movie,
            message: "sucessfully created a new Movie"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            sucess: false,
            error: error,
            data: {},
            message: "something went wrong"
        })
    }
}

export const getmovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const responce = await movieService.getMovieById(movieId)

        if (responce.err) {
            errorResponceBody.err = responce.err;

            return res.status(responce.code).json(errorResponceBody)
        }

        successResponceBody.data = responce
        return res.status(200).json(successResponceBody)


    } catch (error) {
        console.log(error)

        return res.status(500).json(errorResponceBody)
    }
}

export const deltemovie = async (req, res) => {

    try {
        const { movieId } = req.params;
        const responce = await Movie.deleteOne({ _id: movieId });

        res.status(200).json({
            sucess: true,
            error: {},
            message: "sucessfully deleted the movie",
            data: responce
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            sucess: false,
            error: error,
            message: "something went wrong",
            data: {}
        })
    }
}