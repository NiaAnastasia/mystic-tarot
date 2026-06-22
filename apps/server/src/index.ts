import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cardsRouter from './routes/cards'
import authRouter from './routes/auth'
import readingsRouter from './routes/readings'
import { errorHandler } from './middleware/errorHandler'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5174',
  credentials: true,
}))

app.use(express.json())
app.use(cookieParser())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', project: 'Mystic Tarot' })
})

app.use('/cards', cardsRouter)
app.use('/auth', authRouter)
app.use('/readings', readingsRouter)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🔮 Server running on http://localhost:${PORT}`)
})

export default app