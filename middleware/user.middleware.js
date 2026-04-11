import { errorResponceBody } from "../utils/responce.js"

export const validateUpdateUserRequest = (req, res, next) => {
    // validate presence of atleast one of userRole and userStatus
    if (!(req.body.userRole || req.body.userStatus)) {
        errorResponceBody.err = " Mal ware request , please send atlease one paramers of userRole and userStatus in the request body"
        return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponceBody)
    }
    next()
}