// Import essential modules and config
import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import multer from 'multer';

// Import routers and database configuration
import './api/config/database.js';
import userRouter from './api/routes/userRoutes.js';
import tripsRouter from './api/routes/tripsRoutes.js';
import locationRouter from './api/routes/locationRoutes.js';

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3001;
const upload = multer({ storage: multer.memoryStorage() });

// Configure CORS
const corsOptions = {
  origin: ['https://main--venturapp.netlify.app', 'http://127.0.0.1:5500'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Basic endpoint to confirm server is running
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Define API routes
app.use('/api/data', (req, res) => {
  console.log('Data endpoint hit');
  res.json({ message: 'This is data from the backend' });
});

app.use('/api/trips', tripsRouter);
app.use('/user', userRouter);
app.use('/api', locationRouter);


// Generic logging middleware for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`); // Logs the type of HTTP method and the original URL requested.
  next();
});

// Start server listening on specified port
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
