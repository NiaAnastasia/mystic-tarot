import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cardsRouter from './routes/cards'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5174',
  credentials: true,
}))

app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', project: 'Mystic Tarot' })
})

app.use('/cards', cardsRouter)

app.listen(PORT, () => {
  console.log(`🔮 Server running on http://localhost:${PORT}`)
})

export default app