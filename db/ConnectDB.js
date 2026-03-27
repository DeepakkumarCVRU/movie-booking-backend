import mongoose from "mongoose";
import Movie from "../model/Movie.model.js";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Database connected successfully");

    } catch (error) {
        console.log("Database connection failed");
        console.log(error)
    }
};

export default connectDB;