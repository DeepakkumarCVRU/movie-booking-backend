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
        const response = await theatreService.getAllTheatre();
        successResponceBody.data = response;
        successResponceBody.message = " Successfully fetch all the theatres";
        return res.status(200).json(successResponceBody)
    } catch (error) {
        errorResponceBody.err = error;
        return res.status(500).json(errorResponceBody)
    }
}