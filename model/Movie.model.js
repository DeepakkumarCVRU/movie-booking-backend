import mongoose from "mongoose";


// define the schema of the movie resouce to be stored in the database

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    casts: {
        type: [String],
        required: true
    },
    trailerurl: {
        type: String,
        required: true
    },
    langugage: {
        type: String,
        required: true,
        default: "English"
    },
    releaseDate: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    releaseStatus: {
        type: String,
        required: true,
        default: "released"
    }

}, { timestamps: true })


const Movie = mongoose.model("movie", movieSchema)

export default Movie;