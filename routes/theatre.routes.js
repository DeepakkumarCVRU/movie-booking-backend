import { Router } from "express"
import * as theatreController from "../controllers/theatre.controller.js"
import { validateTheatreCreateRequest } from "../middleware/theatre.middleware.js";

const router = Router();

router.post('/mba/api/v1/theatres', validateTheatreCreateRequest, theatreController.create);
router.get('/mba/api/v1/theatres/:id', theatreController.getTheatre);
router.get("/mba/api/v1/theatres", theatreController.getAlltheatre);

export default router;