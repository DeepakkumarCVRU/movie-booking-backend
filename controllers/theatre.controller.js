import * as theatreService from "../services/theatre.service.js";
import { errorResponceBody, successResponceBody } from "../utils/responce.js";

export const create = async (req, res) => {
    try {
        const response = await theatreService.createTheatre(req.body);
        successResponceBody.data = response;
        successResponceBody.message = " successfully created a theatre";

        return res.status(201).json(successResponceBody)

    } catch (error) {
        errorResponceBody.err = error;
        return res.status(500).json(errorResponceBody)
    }
}