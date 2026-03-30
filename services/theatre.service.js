import Theatre from "../model/theatre.model.js";


export const createTheatre = async (data) => {
    try {
        const response = await Theatre.create(data);
        return response;
    } catch (error) {
        if (error.name == "ValidationError") {
            let err = {};

            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message
            })
            return { err: err, code: 422 }
        } else {
            console.log(error)
            throw error
        }


    }
}

export const getTheatre = async (id) => {
    try {
        const response = await Theatre.findById(id);
        if (!response) {
            return {
                error: "no theatre found for the corrsponding id provided",
                code: 404
            }
        }
        return response;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const getAllTheatre = async () => {
    try {
        const response = await Theatre.find({});
        return response;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const deleteTheatreById = async (id) => {
    try {
        const response = await Theatre.findByIdAndDelete(id)
        if (!response) {
            return {
                err: "No record of a theatre found for the given id",
                code: 404
            }
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateMovieInTheatre = async (theatreId, movieIds, insert) => {
    try {
        const theatre = await Theatre.findById(theatreId);
        console.log(theatre)

        if (!theatre) {
            return {
                error: "no such theatre found for the id provided",
                code: 404
            }
        }


        if (insert) {
            //we need to add movie
            movieIds.forEach((movie_Id) => {
                theatre.movie.push(movie_Id)
            })
        } else {
            //we need to remove movie    , you have to fix this becouse add duplicate and remove all the movie if you have to remove
            let savedMovieIds = theatre.movie;
            console.log("all the data ", savedMovieIds)

            movieIds.forEach((movie_Id) => {
                savedMovieIds = savedMovieIds.filter(smi => smi == movie_Id);


                theatre.movie = savedMovieIds;
            })


        }
        await theatre.save();
        await theatre.populate("movie")
        return theatre;

    } catch (error) {
        console.log(error)
        throw error
    }
}
