import { Router } from "express"
import * as theatreController from "../controllers/theatre.controller.js"
import { validateTheatreCreateRequest, validateUpdateMovie } from "../middleware/theatre.middleware.js";

const router = Router();

router.post('/mba/api/v1/theatres', validateTheatreCreateRequest, theatreController.create);
router.get('/mba/api/v1/theatres/:id', theatreController.getTheatre);
router.get("/mba/api/v1/theatres", theatreController.getAlltheatre);
router.delete("/mba/api/v1/theatres/:id", theatreController.deleteTheatre)
router.patch("/mba/api/v1/theatres/:id/movies", validateUpdateMovie, theatreController.updateMovie)
// router.get("/mba/api/v1/theatres/find", theatreController.getAllMovieswithCondition) this route does not work so fix it or ignore it
router.patch("/mba/api/v1/theatres/:id", theatreController.updateTheatre)
router.put("/mba/api/v1/theatres/:id", theatreController.updateTheatre)

export default router;