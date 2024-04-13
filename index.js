import 'dotenv/config.js';
import express from 'express';
import cors  from 'cors';
import './api/config/database.js'
import userRouter from './api/routes/userRoutes.js'
import tripsRouter from './api/routes/tripsRoutes.js'
import locationRouter from './api/routes/locationRoutes.js'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose'
import multer from 'multer';
import tripRoutes from './api/routes/tripsRoutes.js';
import { getAllTrips, saveTrip, getTripsByLocation } from './api/controllers/tripsController.js';
import { getAllTripsByLocation } from './api/controllers/locationController.js';
const db = mongoose.connection


const app = express()
const PORT = process.env.PORT || 3001

mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});


const corsOptions = {
  origin: ['https://main--venturapp.netlify.app', 'http://127.0.0.1:5500'], // Allowed origins
  credentials: true, // Allow cookies to be sent with requests
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Use CORS with options
app.use(cors(corsOptions));

const upload = multer({ storage: multer.memoryStorage() });


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

app.get('/api/trips', getAllTrips);
app.post('/api/trip', saveTrip);
// To fetch trips by a searchable name or string
app.get('/locations/name/:locationName/trips', getAllTripsByLocation);

// To fetch trips by a specific location ID
app.get('/locations/id/:locationId/trips', getTripsByLocation);

app.use('/user', userRouter);
app.use('/trip', tripsRouter);
app.use('/api', tripRoutes);
app.use('/api', locationRouter);
app.use(locationRouter);
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`); // Logs the type of HTTP method and the original URL requested.
  next();
});

app.listen(PORT, () => {
  console.log(`you are listening on port http://localhost:${PORT}`)
})