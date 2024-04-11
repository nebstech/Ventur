import 'dotenv/config.js';
import express from 'express';
import cors  from 'cors';
import './config/database.js'
import userRouter from './routes/userRoutes.js'
import tripsRouter from './routes/tripsRoutes.js'
import locationRouter from './routes/locationRoutes.js'
import cookieParser from 'cookie-parser';



const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get('/api/data', (req, res) => {
  console.log('Data endpoint hit');
  res.json({ message: 'This is data from the backend' });
});

app.use('/user', userRouter);
app.use('/trip', tripsRouter);
app.use(locationRouter)
app.use(express.static('Ventur-frontend'));


app.listen(PORT, () => {
  console.log(`you are listening on port http://localhost:${PORT}`)
})