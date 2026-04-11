import { Router } from "express";
import * as movieController from "../controllers/movie.controller.js";
import ValidateMovieCreateRequest from "../middleware/movie.middleware.js";
import * as authMiddleware from "../middleware/auth.middleware.js"


const router = Router();

router.post(
    "/mba/api/v1/movies",
    authMiddleware.IsAuthenticated,
    authMiddleware.isAdminOrClient,
    ValidateMovieCreateRequest,
    movieController.createMovie
);
router.get(
    "/mba/api/v1/movie/:movieId",
    movieController.getmovie
)
router.delete(
    "/mba/api/v1/movie/:movieId",
    authMiddleware.IsAuthenticated,
    authMiddleware.isAdminOrClient,
    movieController.deletemovie
)
router.put(
    "/mba/api/v1/movie/:movieId",
    authMiddleware.IsAuthenticated,
    authMiddleware.isAdminOrClient,
    movieController.updateMovie,

)
router.patch(
    "/mba/api/v1/movie/:movieId",
    authMiddleware.IsAuthenticated,
    authMiddleware.isAdminOrClient,
    movieController.updateMovie
)

router.get(
    "/mba/api/v1/movie",
    movieController.getMovieByName
)


export default router;