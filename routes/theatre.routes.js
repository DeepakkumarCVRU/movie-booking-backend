import { Router } from "express"
import * as theatreController from "../controllers/theatre.controller.js"
import { validateTheatreCreateRequest, validateUpdateMovie } from "../middleware/theatre.middleware.js";

const router = Router();

//{create theatre}
router.post(
    '/mba/api/v1/theatres',
    validateTheatreCreateRequest,
    theatreController.create
);

//{get theatre by id}
router.get(
    '/mba/api/v1/theatres/:id',
    theatreController.getTheatre
);

/*{ 
    get all theatres , we have also applied filter based on city , pincode , name of the theatre  and
    we can also find all the theatres which are running particular movie 
    http://localhost:5000/mba/api/v1/theatres?city=delhi&pincode=110001&name=abc&movieId=1234&movieId=69c63095b7a23ffe05e2d2ae
    
    {
        whenever i going to specific movie i can get all the theatre which are running that movie and their address , name etc
    }
}*/
router.get(
    "/mba/api/v1/theatres",
    theatreController.getAlltheatre
);

// {delete theatre by id}
router.delete(
    "/mba/api/v1/theatres/:id",
    theatreController.deleteTheatre)

//{update movie in a theatre , we can add movie in a theatre or remove movie from a theatre}
router.patch(
    "/mba/api/v1/theatres/:id/movies",
    validateUpdateMovie, theatreController.updateMovie
)

// {update theatre details}
router.patch("/mba/api/v1/theatres/:id", theatreController.updateTheatre)
router.put("/mba/api/v1/theatres/:id", theatreController.updateTheatre)

// {get all the movies in a particular theatre , whenever i going to specific theatre i can get all the movies which running in that theatre}
router.get(
    "/mba/api/v1/theatres/:id/movies",
    theatreController.getMovieInTheatre
)


// {get specific movie in a theatre}
router.get(
    "/mba/api/v1/theatres/:theatresId/movies/:movieId",
    theatreController.checkMovie
)

export default router;