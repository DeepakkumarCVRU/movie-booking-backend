import { STATUS_CODE } from "../utils/constant.js";

const badRequestResponse = {
    success: false,
    err: {},
    data: {},
    message: "Malformed Request | Bad Request",
}

const ValidateMovieCreateRequest = (req, res, next) => {
    //validate the movie name
    if (!req.body.name) {
        badRequestResponse.err = "The name of the movie is not present in the request";
        return res.status(STATUS_CODE.BAD_REQUEST).json(badRequestResponse)
    }
    //validate the movie description 
    if (!req.body.description) {
        badRequestResponse.err = "The description of the movie is not present in the request";
        return res.status(STATUS_CODE.BAD_REQUEST).json(badRequestResponse)
    }
    //validate the movie casts
    if (!req.body.casts || !(req.body.casts instanceof Array) || req.body.casts.length == 0) {
        badRequestResponse.err = "The casts of the movie is not present in the request";
        return res.status(STATUS_CODE.BAD_REQUEST).json(badRequestResponse)
    }
    //validate the movie trailer url
    if (!req.body.trailerurl) {
        badRequestResponse.err = "The trailer url of the movie is not present in the request";
        return res.status(STATUS_CODE.BAD_REQUEST).json(badRequestResponse)
    }
    //validate the releaseDate 
    if (!req.body.releaseDate) {
        badRequestResponse.err = "The release date of the movie is not present in the request";
        return res.status(STATUS_CODE.BAD_REQUEST).json(badRequestResponse)
    }

    //validate the director
    if (!req.body.director) {
        badRequestResponse.err = "The director of the movie is not present in the request";
        return res.status(STATUS_CODE.BAD_REQUEST).json(badRequestResponse)
    }

    next()
}

export default ValidateMovieCreateRequest