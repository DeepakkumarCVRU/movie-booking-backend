import * as theatreService from "../services/theatre.service.js";
import { errorResponceBody, successResponceBody } from "../utils/responce.js";

export const create = async (req, res) => {
    try {
        const response = await theatreService.createTheatre(req.body);

        if (response.err) {
            errorResponceBody.err = response.err;
            errorResponceBody.message = " validation field on few parameters of the request body ";
            return res.status(response.code).json(errorResponceBody);
        }


        successResponceBody.data = response;
        successResponceBody.message = " successfully created a theatre";

        return res.status(201).json(successResponceBody)

    } catch (error) {
        errorResponceBody.err = error;
        return res.status(500).json(errorResponceBody)
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
        res.status(200).json(successResponceBody);
    } catch (error) {
        console.log(error)
        errorResponceBody.err = error;
        res.status(500).json(errorResponceBody)
    }
}

export const getAlltheatre = async (req, res) => {
    try {

        const response = await theatreService.getAllTheatre(req.query);
        successResponceBody.data = response;
        successResponceBody.message = " Successfully fetch all the theatres";
        return res.status(200).json(successResponceBody)
    } catch (error) {
        errorResponceBody.err = error.err;
        return res.status(500).json(errorResponceBody)
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

        return res.status(200).json(successResponceBody)
    } catch (error) {
        errorResponceBody.err = error;
        return res.status(500).json({ errorResponceBody })
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
        return res.status(200).json(successResponceBody)

    } catch (error) {
        console.log("error:", error)
        errorResponceBody.err = error;
        return res.status(500).json(errorResponceBody)
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
        return res.status(200).json(successResponceBody)
    } catch (error) {
        console.log(error);
        errorResponceBody.err = error;
        return res.status(500).json(errorResponceBody)
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
        return res.status(200).json(successResponceBody)

    } catch (error) {
        errorResponceBody.err = error;
        return res.status(error.code).json(errorResponceBody)

    }
}