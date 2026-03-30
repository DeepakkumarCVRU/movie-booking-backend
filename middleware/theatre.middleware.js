import { errorResponceBody } from "../utils/responce.js"


export const validateTheatreCreateRequest = async (req, res, next) => {
    //validation of presence of name
    if (!req.body.name) {
        errorResponceBody.message = "The name of the theatre is not present in the request"
        return res.status(400).json(errorResponceBody)
    }
    // validation of presence of pincode
    if (!req.body.pincode) {
        errorResponceBody.message = "The pincode of the theatre is not present in the request"
        return res.status(400).json(errorResponceBody)
    }
    //validation of the presence of city
    if (!req.body.city) {
        errorResponceBody.message = "The city of the theatre is not present in the request"
        return res.status(400).json(errorResponceBody)
    }







    next()
}

export const validateUpdateMovie = (req, res, next) => {
    //validate of insert parameter
    if (req.body.insert == undefined) {
        errorResponceBody.message = "The insert parametre is missing in the request";
        return res.status(400).json(errorResponceBody)
    }
    //validate movieId parameter
    if (!req.body.movieIds) {
        errorResponceBody.message = "No movie present the request to be updated in theatre";
        return res.status(400).json(errorResponceBody)
    }

    //validate if movieId is an Array or not 
    if (!req.body.movieId instanceof Array) {
        errorResponceBody.message = "expected array of movie but found something else "
        return res.status(400).json(errorResponceBody)
    }

    //valiate if movieid is empty of not 
    if (!req.body.movieId == 0) {
        errorResponceBody.message = " No movie present in the array provided";
        return res.status(400).json(errorResponceBody)
    }

    next()

}