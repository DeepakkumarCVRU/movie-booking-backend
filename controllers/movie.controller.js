
import * as movieService from "../services/movie.service.js"
import { errorResponceBody, successResponceBody } from "../utils/responce.js"






export const createMovie = async (req, res) => {
    try {
        const response = await movieService.createMOvie(req.body);

        if (response.err) {
            errorResponceBody.err = response.err;
            errorResponceBody.message = "validation field on few parameters of the request body ";
            return res.status(response.code).json(errorResponceBody)
        }

        successResponceBody.data = response,
            successResponceBody.message = "sucessfully created a new Movie"
        return res.status(201).json(successResponceBody)

    } catch (error) {

        console.log("error name : ", error)
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

export const updateMovie = async (req, res) => {
    try {
        const response = await movieService.updateMovieById(req.params.movieId, req.body)
        if (response.err) {
            errorResponceBody.err = response.err;
            errorResponceBody.message = "validation field on few parameters of the request body ";
            return res.status(response.code).json(errorResponceBody)
        }
        successResponceBody.data = response;

        return res.status(200).json({ successResponceBody })
    } catch (error) {
        console.log(error)
        errorResponceBody.err = error;
        res.status(500).json(errorResponceBody)
    }
}