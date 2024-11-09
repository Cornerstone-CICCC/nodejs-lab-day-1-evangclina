// Create your server
import express, { Request, Response } from "express"
import cors from 'cors'
import userRouter from "./routes/user.routes"
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()


// Create server
const app = express()

//middleware
app.use(cors({
  origin: "http://localhost:4321",
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.COOKIE_KEY))

// Routes
app.use("/", userRouter)

//404 fallback
app.use((req: Request, res: Response) => {
    res.status(404).send("Invalid route")
})

// Start server
const PORT: number = Number(process.env.PORT || 4000)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})