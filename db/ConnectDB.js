import mongoose from "mongoose";
import Movie from "../model/Movie.model.js";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Database connected successfully");

        await Movie.create(
            {
                name: "Inception",
                description: "A skilled thief enters people's dreams to steal secrets.",
                casts: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
                trailerurl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
                langugage: "English",
                releaseDate: "2010-07-16",
                director: "Christopher Nolan",
                releaseStatus: "released"
            }
        );

    } catch (error) {
        console.log("Database connection failed");
        console.log(error)
    }
};

export default connectDB;