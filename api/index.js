import 'dotenv/config.js';
import express from 'express';
import cors  from 'cors';
import './config/database.js'
import userRouter from './routes/userRoutes.js'
import tripsRouter from './routes/tripsRoutes.js'
import locationRouter from './routes/locationRoutes.js'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose'
import multer from 'multer';
import tripRoutes from './routes/tripsRoutes.js';
import { saveTrip } from './controllers/tripsController.js';
import path from 'path';
const db = mongoose.connection


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ['http://localhost:5500'],
}));

const corsOptions = {
  origin: 'http://127.0.0.1:5500', 
  credentials: true, 
};

const upload = multer({ storage: multer.memoryStorage() });
// app.post('/trip', upload.single('image'), createTrip);

app.use(cors(corsOptions));

app.get('/api/data', (req, res) => {
  console.log('Data endpoint hit');
  res.json({ message: 'This is data from the backend' });
});

app.get('/locations', async (req, res) => {
  const { country, state } = req.query;
  try {
      const collection = db.collection('locations');
      if (state) {
          const location = await collection.findOne({ country: country, state: state });
          const cities = location ? location.cities : [];
          res.json(cities);
      } else if (country) {
          const states = await collection.distinct('state', { country: country });
          res.json(states);
      } else {
          const countries = await collection.distinct('country');
          res.json(countries);
      }
  } catch (error) {
      console.error('Database query failed:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});




app.use('/user', userRouter);
app.use('/trip', tripsRouter);
app.use('/api', tripRoutes);
app.use(locationRouter)
app.use(express.static('public'));



app.listen(PORT, () => {
  console.log(`you are listening on port http://localhost:${PORT}`)
})