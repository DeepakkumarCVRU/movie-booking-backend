import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import mongoose, { mongo } from "mongoose"
import connectDB from "./db/ConnectDB.js"

const app = express() // express app object

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
dotenv.config()

connectDB()



const PORT = process.env.PORT || 3001
console.log(PORT)


app.get("/home", (req, res) => {
    return res.send("hello worldddd")
})

app.listen(PORT, () => {
    //this call back execute when server is running
    console.log(`server is running on port ${PORT}`)


})