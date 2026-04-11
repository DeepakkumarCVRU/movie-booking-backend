
import * as movieService from "../services/movie.service.js"
import { STATUS_CODE } from "../utils/constant.js";
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
        return res.status(STATUS_CODE.CREATED).json(successResponceBody)

    } catch (error) {

        console.log("error name : ", error)
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponceBody)
    }
}

export const getmovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const responce = await movieService.getMovieById(movieId)

        successResponceBody.message = "sucessfully fetched the movie"
        successResponceBody.data = responce
        return res.status(STATUS_CODE.OK).json(successResponceBody)
    } catch (error) {
        console.log(error)
        if (error.err) {
            errorResponceBody.err = error.err;
            return res.status(error.code).json(errorResponceBody)
        }
        errorResponceBody.err = error;
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponceBody)
    }
}

export const deletemovie = async (req, res) => {

    try {
        const { movieId } = req.params;
        const responce = await movieService.deleteMovieById(movieId);

        console.log(responce)

        successResponceBody.message = "sucessfully deleted the movie"
        successResponceBody.data = responce
        return res.status(STATUS_CODE.OK).json({ successResponceBody })

    } catch (error) {
        console.log(error)
        if (error.err) {
            errorResponceBody.err = error.err;
            return res.status(error.code).json(errorResponceBody)
        }
        errorResponceBody.err = error;
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponceBody)
    }
}

export const updateMovie = async (req, res) => {
    try {
        const response = await movieService.updateMovieById(req.params.movieId, req.body)

        successResponceBody.data = response;

        return res.status(STATUS_CODE.OK).json({ successResponceBody })
    } catch (error) {
        console.log(error)
        if (error.err) {
            errorResponceBody.err = error.err;
            return res.status(error.code).json(errorResponceBody)
        }
        errorResponceBody.err = error;
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponceBody)
    }
}


export const getMovieByName = async (req, res) => {
    try {
        const response = await movieService.getMovieByName(req.query)

        successResponceBody.data = response;
        return res.status(STATUS_CODE.OK).json({ successResponceBody })
    } catch (error) {
        console.log(error)
        if (error.err) {
            errorResponceBody.err = error.err;
            return res.status(error.code).json(errorResponceBody)
        }
        errorResponceBody.err = error;
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponceBody)
    }
}