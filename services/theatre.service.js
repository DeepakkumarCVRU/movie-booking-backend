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

export const getAllTheatre = async (data) => {
    try {

        let query = {};
        let pagination = {};
        if (data && data.city) {
            // this checks whether city is present in query params or not
            query.city = data.city;
        }

        if (data && data.pincode) {
            // this checks whether pincode is present in query params or not
            query.pincode = data.pincode;
        }
        if (data && data.name) {
            // this checks whether name is present in query params or not
            query.name = data.name;
        }
        if (data && data.limit) {
            pagination.limit = data.limit;
        }
        if (data && data.skip) {
            // let perpage = data.perpage ? data.perpage : 5

            // for first page we send skip as 0
            let perpage = data.limit ? data.limit : 5
            pagination.skip = data.skip * perpage;
        }
        const response = await Theatre.find(query, {}, pagination);
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
        //const theatre = await Theatre.findById(theatreId);

        // code which written by you tube where you have to add or remove movie

        /*  if (insert) {
              //we need to add movie
              movieIds.forEach((movie_Id) => {
                  theatre.movie.push(movie_Id)
              })
          } else {
              //we need to remove movie    , you have to fix this becouse add duplicate and remove all the movie if you have to remove
              let savedMovieIds = theatre.movie;
  
              movieIds.forEach((movie_Id) => {
                  savedMovieIds = savedMovieIds.filter(smi => smi !== movie_Id);
  
                  theatre.movie = savedMovieIds;
              })
  
  
          }
              */


        let theatres;

        if (insert) {
            theatres = await Theatre.findByIdAndUpdate(
                theatreId,
                { $addToSet: { movie: { $each: movieIds } } },
                { returnDocument: "after" }
            );
        } else {
            theatres = await Theatre.findByIdAndUpdate(
                theatreId,
                { $pull: { movie: { $in: movieIds } } },
                { returnDocument: "after" }
            );
        }

        if (!theatres) {
            return {
                error: "no such theatre found for the id provided",
                code: 404
            }
        }

        await theatres.save();
        await theatres.populate("movie")
        return theatres;

    } catch (error) {
        console.log(error)
        throw error
    }
}


// in this code lot of error so you can ignore it or fix it

/* export const getAllTheatreWithCondition = async (data) => {
    try {

        let query = {};

        if (data && data.city) {
            query.city = data.city;
        }

        if (data && data.pincode) {
            query.pincode = data.pincode;
        }
        if (data && data.name) {
            query.name = data.name;
        }

        console.log(query)


        const response = await Theatre.find(query);
        return response;
    } catch (error) {
        console.log(error)
        throw error
    }
} */


export const updateTheatre = async (id, data) => {
    try {
        const response = await Theatre.findByIdAndUpdate(id, data,
            { returnDocument: "after" }
        );

        if (!response) {
            return {
                err: "No record of a theatre found for the given id",
                code: 404
            }
        }
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


