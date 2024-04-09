import 'dotenv/config.js';
import express from 'express';
import './config/database.js'
import userRouter from './routes/userRoutes.js'
import tripsRouter from './routes/tripsRoutes.js'
import locationRouter from './routes/locationRoutes.js'
import cookieParser from 'cookie-parser';


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json('Your server is running')
})

app.use('/user', userRouter);
app.use('/trip', tripsRouter);
app.use(locationRouter)

app.listen(PORT, () => {
  console.log(`you are listening on port http://localhost:${PORT}`)
})