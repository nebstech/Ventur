import 'dotenv/config.js';
import express from 'express';
// import userRouter from './routes/userRoutes.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.json('Your server is running')
})

app.listen(PORT, () => {
  console.log(`you are listening on port http://localhost:${PORT}`)
})