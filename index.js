import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import connectDB from "./db/ConnectDB.js"
import cors from "cors"
import router from "./routes/movie.routes.js"
import theatreRouter from "./routes/theatre.routes.js"
import mongoose from "mongoose"




const app = express() // express app object

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

dotenv.config()
app.use(cors())

connectDB();

const PORT = process.env.PORT || 3001
app.use(router)
app.use(theatreRouter)

// Source - https://stackoverflow.com/a/18763020
// Posted by mr.freeze, modified by community. See post 'Timeline' for change history
// Retrieved 2026-04-06, License - CC BY-SA 3.0

// mongoose.set('debug', true);


app.get("/", (req, res) => {
    return res.send("hello from server home route")
})

app.listen(PORT, () => {
    //this call back execute when server is running
    console.log(`server is running on port ${PORT}`)


})