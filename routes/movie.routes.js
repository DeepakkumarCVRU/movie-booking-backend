import { Router } from "express";
import * as movieController from "../controllers/movie.controller.js";


const router = Router();

router.post("/mba/api/v1/movies", movieController.createMovie)

export default router;