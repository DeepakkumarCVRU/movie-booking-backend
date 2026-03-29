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