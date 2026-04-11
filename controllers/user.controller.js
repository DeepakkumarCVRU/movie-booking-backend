import * as userService from "../services/user.service.js"
import { errorResponceBody, successResponceBody } from "../utils/responce.js"



// this code not working properly you should want know , then go to userModel and see what is the problem in this , thank you 


export const updateUser = async (req, res) => {
    try {

        const response = await userService.updateUserRoleOrStatus(req.body, req.params.id);

        successResponceBody.data = response;
        successResponceBody.message = " successfully updated the user "
        return res.status(200).json(successResponceBody)

    } catch (error) {
        console.log(error);

        if (error.err) {
            errorResponceBody.err = error.err;
            return res.status(error.code).json(errorResponceBody)
        }
        errorResponceBody.err = error;
        return res.status(500).json(errorResponceBody)
    }
}


