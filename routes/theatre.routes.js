import { Router } from "express"
import * as theatreController from "../controllers/theatre.controller.js"

const router = Router();

router.post('/mba/api/v1/theatres', theatreController.create);

export default router;