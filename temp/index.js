import express from 'express'
import { connectDB } from './config/db.js'
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from 'cors'

import userRoute from "./routes/user.route.js"

dotenv.config()

const app = express()

app.use(express.json())

app.use(cookieParser())

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))

app.use('', userRoute)

connectDB();

const port = 3000

app.get("/", (req, res) => {
    res.send("Hello World!")
})

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server running locally on http://localhost:${port}`);
  });
}

export default app;