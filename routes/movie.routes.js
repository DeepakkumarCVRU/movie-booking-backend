import { Router } from "express";
import * as movieController from "../controllers/movie.controller.js";
import ValidateMovieCreateRequest from "../middleware/movie.middleware.js";


const router = Router();

router.post("/mba/api/v1/movies", ValidateMovieCreateRequest, movieController.createMovie)
router.get("/mba/api/v1/movie/:movieId", movieController.getmovie)
router.delete("/mba/api/v1/movie/:movieId", movieController.deletemovie)
router.put("/mba/api/v1/movie/:movieId", movieController.updateMovie)
router.patch("/mba/api/v1/movie/:movieId", movieController.updateMovie)
router.get("/mba/api/v1/movie", movieController.getMovieByName)


export default router;