import * as theatreService from "../services/theatre.service.js"
import { STATUS_CODE } from "../utils/constant.js"
import { isValidObjectId } from "mongoose"
import { errorResponceBody } from "../utils/responce.js"
import Theatre from "../model/theatre.model.js"


export const validateBookingCreateRequest = async (req, res, next) => {
    //validate the theatre id present in the request or not
    if (!req.body.theatreId) {
        errorResponceBody.err = "No theatre Id provided";
        return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponceBody)
    }

    // validate correct theatre Id formate

    if (!isValidObjectId(req.body.theatreId)) {
        errorResponceBody.err = "Invalid theatre Id provided";
        return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponceBody)
    }

    //check theatre exist in database or not 
    const theatre = await theatreService.getTheatre(req.body.theatreId)

    if (!theatre) {
        errorResponceBody.err = "No theatre found for the given id provided";
        return res.status(STATUS_CODE.NOT_FOUND).json(errorResponceBody)
    }

    //validate movieId present or not 
    if (!req.body.movieId) {
        errorResponceBody.err = "No movie Id provided";
        return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponceBody)
    }

    //correct movieId formate
    if (!isValidObjectId(req.body.movieId)) {
        errorResponceBody.err = "Invalid movie Id formate provided";
        return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponceBody)
    }

    //if movie is running in theatre or not
    if (!theatre.movie.includes(req.body.movieId)) {   // you have to learn about what does work include in mongoose 
        errorResponceBody.err = "No such movie is running in this theatre || Given movie is not available in the requested thatre";
        return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponceBody)
    }

    //validate presence of timing 
    if (!req.body.timings) {
        errorResponceBody.err = "Timing not provided in the request";
        return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponceBody)
    }

    //validate noOfSeat present or not 
    if (!req.body.noOfSeat) {
        errorResponceBody.err = "No of seat not provided in the request";
        return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponceBody)
    }


    //request is correct 
    next();
}



