import express from 'express'
import { connectDB } from './config/db.js'
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(express.json())

const port = 3000

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(port, () => {
    connectDB()
    console.log(`server runs on port ${port}`);
})