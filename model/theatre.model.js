import mongoose, { mongo } from "mongoose"
import Movie from "./movie.model.js"

const theatreSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        minLength: 5
    },
    description: String,
    city: {
        required: true,
        type: String
    },
    pincode: {
        required: true,
        type: Number
    },
    address: String,
    movie: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Movie"
    }
}, { timestamps: true })

const Theatre = mongoose.model("theatre", theatreSchema)

export default Theatre;