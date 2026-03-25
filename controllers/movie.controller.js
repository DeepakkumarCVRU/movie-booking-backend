
import Movie from "../model/Movie.model.js"


export const createMovie = async (req, res) => {
    try {
        const { name, description, casts, trailerurl, langugage, releaseDate, director, releaseStatus } = req.body

        const movie = new Movie({
            name: name,
            description: description,
            casts: casts,
            trailerurl: trailerurl,
            langugage: langugage,
            releaseDate: releaseDate,
            director: director,
            releaseStatus: releaseStatus
        })

        const savedMovie = await movie.save()
        return res.status(201).json({
            sucess: true,
            error: {},
            data: movie,
            message: "sucessfully created a new Movie"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            sucess: false,
            error: error,
            data: {},
            message: "something went wrong"
        })
    }
}