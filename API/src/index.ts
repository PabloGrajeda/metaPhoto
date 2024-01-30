import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

// routes
import userRoutes from './routes/userRoutes'
import photoRoutes from './routes/photoRoutes'
import albumRoutes from './routes/albumRoutes'
// import { errorHandler } from './middlewares/errorMiddleware'

dotenv.config()

const { PORT } = process.env

const app = express()

// cors config
const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
}
app.use(cors(options))


app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/photos', photoRoutes)
app.use('/api/albums', albumRoutes)



// app.use(errorHandler)

app.get('/ping', (_req, res) => {
  console.log('ping received')
  res.status(200).send('pong')
})

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Server listening on port ${PORT}`)
})
