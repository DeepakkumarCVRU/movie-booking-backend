import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import connectDB from "./db/ConnectDB.js"
import cors from "cors"
import router from "./routes/movie.routes.js"




const app = express() // express app object

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

dotenv.config()
app.use(cors())

connectDB();

const PORT = process.env.PORT || 3001
app.use(router)

app.get("/", (req, res) => {
    return res.send("hello from server home route")
})

app.listen(PORT, () => {
    //this call back execute when server is running
    console.log(`server is running on port ${PORT}`)


})