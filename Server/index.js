import express from 'express'
import { connectDB } from './config/db.js'
import dotenv from "dotenv"

import userRoute from "./routes/user.route.js"

dotenv.config()

const app = express()

app.use(express.json())

app.use('', userRoute)

const port = 3000

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(port, () => {
    connectDB()
    console.log(`server runs on port ${port}`);
})