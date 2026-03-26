import { Router } from "express";
import * as movieController from "../controllers/movie.controller.js";


const router = Router();

router.post("/mba/api/v1/movies", movieController.createMovie)
router.get("/mba/api/v1/movie/:movieId", movieController.getmovie)
router.delete("/mba/api/v1/movie/:movieId", movieController.deltemovie)


export default router;