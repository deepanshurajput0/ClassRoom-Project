import express from 'express'
import dotenv from 'dotenv'
import { ConnectDB } from './db/db.js'
import userRouter from './routes/userRoutes.js'
import classRouter from './routes/principalRoutes.js'
import teacherRouter from './routes/teacherRoutes.js'
import studentRouter from './routes/studentRoutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express()

dotenv.config({})

const PORT = process.env.PORT

app.use(express.json())

app.use(cors())

app.use(cookieParser())

app.use('/api/v1',userRouter)

app.use('/api/v1',classRouter)

app.use('/api/v1',teacherRouter)

app.use('/api/v1',studentRouter)



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    ConnectDB()
})


export default app



