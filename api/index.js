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
import { getAllTrips, saveTrip, getTripsByLocation } from './controllers/tripsController.js';
const db = mongoose.connection


const app = express()
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})
.on('error', err => {
  console.error('Server failed to start:', err);
});

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ['http://localhost:5500'],
  optionsSuccessStatus: 200
}));

const corsOptions = {
  origin: 'http://127.0.0.1:5500', 
  credentials: true, 
};

const upload = multer({ storage: multer.memoryStorage() });

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

app.get('/search-results', async (req, res) => {
  const { location } = req.query;
  try {
      const trips = await Trip.find({ "location.city": location }); // Assuming you want to match by city
      res.render('search-results', { trips }); // Render a view with the trips data
  } catch (error) {
      res.status(500).send('Failed to get search results');
  }
});

app.get('/api/trips', getAllTrips);
app.post('/api/trip', saveTrip);

app.get('/locations/:locationId/trips', getTripsByLocation);

app.use('/user', userRouter);
app.use('/trip', tripsRouter);
app.use('/api', tripRoutes);
app.use(locationRouter)
app.use(express.static('public'));



app.listen(PORT, () => {
  console.log(`you are listening on port http://localhost:${PORT}`)
})