
import Movie from "../model/Movie.model.js"
import * as movieService from "../services/movie.service.js"
import { errorResponceBody, successResponceBody } from "../utils/responce.js"






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

        successResponceBody.data = savedMovie,
            successResponceBody.message = "sucessfully created a new Movie"
        return res.status(201).json(successResponceBody)

    } catch (error) {
        console.log(error)
        return res.status(500).json(errorResponceBody)
    }
}

export const getmovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const responce = await movieService.getMovieById(movieId)

        if (responce.error) {
            errorResponceBody.err = responce.err;
            return res.status(responce.code).json(errorResponceBody)
        }
        successResponceBody.message = "sucessfully fetched the movie"
        successResponceBody.data = responce
        return res.status(200).json(successResponceBody)
    } catch (error) {
        console.log(error)
        return res.status(500).json(errorResponceBody)
    }
}

export const deletemovie = async (req, res) => {

    try {
        const { movieId } = req.params;
        const responce = await movieService.deleteMovieById(movieId);

        if (responce.error) {
            errorResponceBody.err = responce.error;
            return res.status(responce.code).json(errorResponceBody)
        }

        successResponceBody.message = "sucessfully deleted the movie"
        successResponceBody.data = responce
        return res.status(200).json({ successResponceBody })

    } catch (error) {
        console.log(error)
        return res.status(500).json(errorResponceBody)
    }
}