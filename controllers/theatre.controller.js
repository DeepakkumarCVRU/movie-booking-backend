import * as theatreService from "../services/theatre.service.js";
import { errorResponceBody, successResponceBody } from "../utils/responce.js";
import { STATUS_CODE } from "../utils/constant.js";

export const create = async (req, res) => {
    try {
        const response = await theatreService.createTheatre(req.body);



        successResponceBody.data = response;
        successResponceBody.message = " successfully created a theatre";

        return res.status(STATUS_CODE.CREATED).json(successResponceBody)

    } catch (error) {

        if (error.err) {
            errorResponceBody.err = error.err;
            errorResponceBody.message = " validation field on few parameters of the request body ";
            return res.status(error.code).json(errorResponceBody)
        }

        errorResponceBody.err = error;
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponceBody)
    }
}

export const getTheatre = async (req, res) => {

    try {
        const response = await theatreService.getTheatre(req.params.id);
        if (response.error) {
            errorResponceBody.err = response.error;

            return res.statu(response.code).json(errorResponceBody);
        }

        successResponceBody.data = response;
        successResponceBody.message = " Successfully fetched the data of the theatre";
        res.status(STATUS_CODE.OK).json(successResponceBody);
    } catch (error) {
        console.log(error)
        errorResponceBody.err = error;
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponceBody)
    }
}

export const getAlltheatre = async (req, res) => {
    try {

        const response = await theatreService.getAllTheatre(req.query);
        successResponceBody.data = response;
        successResponceBody.message = " Successfully fetch all the theatres";
        return res.status(STATUS_CODE.OK).json(successResponceBody)
    } catch (error) {
        errorResponceBody.err = error.err;
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponceBody)
    }
}

export const deleteTheatre = async (req, res) => {
    try {

        const response = await theatreService.deleteTheatreById(req.params.id)

        if (response.err) {
            errorResponceBody.err = response.err;
            return res.status(response.code).json(errorResponceBody)
        }

        successResponceBody.data = response;
        successResponceBody.message = "successfully deleted the given theatre";

        return res.status(STATUS_CODE.OK).json(successResponceBody)
    } catch (error) {
        errorResponceBody.err = error;
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ errorResponceBody })
    }
}


/**
 * 
 * @param {id} req.params.id --> unique id of theatre for which we want to update movie  
 * @param {movieId} req.body.movieId   ---> array of movie ids that are expected to be updated in thetre
 * @param {isert} req.body.isert --> boolean that tell whether we want insert movie or remove movie 
 * @returns -> updated theatres object 
*/

export const updateMovie = async (req, res) => {
    try {
        const response = await theatreService.updateMovieInTheatre(
            req.params.id,
            req.body.movieIds,
            req.body.insert
        )

        if (response.error) {
            errorResponceBody.err = response.error;
            return res.status(response.code).json(errorResponceBody)
        }

        successResponceBody.data = response;
        successResponceBody.message = "Successfully updated movie in the theatre ";
        return res.status(STATUS_CODE.OK).json(successResponceBody)

    } catch (error) {
        console.log("error:", error)
        errorResponceBody.err = error;
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponceBody)
    }
}



export const updateTheatre = async (req, res) => {
    try {
        const response = await theatreService.updateTheatre(req.params.id, req.body);
        if (response.err) {
            errorResponceBody.err = response.err;

            return res.status(response.code).json(errorResponceBody);
        }
        successResponceBody.data = response;
        successResponceBody.message = "Successfully updated the theatre";
        return res.status(STATUS_CODE.OK).json(successResponceBody)
    } catch (error) {
        console.log(error);
        errorResponceBody.err = error;
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponceBody)
    }
}



export const getMovieInTheatre = async (req, res) => {
    try {
        const response = await theatreService.getMoviesInATheatre(req.params.id)

        if (response.err) {
            errorResponceBody.err = response.err;
            return res.status(response.code).json(errorResponceBody)
        }

        successResponceBody.data = response;
        successResponceBody.message = "successfully fetch the movie data which running in a theatre"
        return res.status(STATUS_CODE.OK).json(successResponceBody)

    } catch (error) {
        errorResponceBody.err = error;
        return res.status(error.code).json(errorResponceBody)

    }
}

export const checkMovie = async (req, res) => {
    try {
        const response = await theatreService.checkMovieInATheatre(req.params.theatresId, req.params.movieId)

        if (response.err) {
            errorResponceBody.err = response.err;
            return res.status(response.code).json(errorResponceBody)
        }

        successResponceBody.data = response;
        successResponceBody.message = "Successfully checked the movie in a theatre"
        return res.status(STATUS_CODE.OK).json(successResponceBody)
    } catch (error) {
        errorResponceBody.err = error;
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponceBody)
    }
}