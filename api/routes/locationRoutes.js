import express from 'express';
import {
  getAllTripsByLocation,
  createTripForLocation,
  updateLocation,
  deleteLocation,
  createLocation,
  getLocationById,
  getAllLocations,
  getLocations
} from '../controllers/locationController.js';

const router = express.Router();

// Basic Locations Routes
router.get('/locations', getAllLocations);  // Fetch all locations
router.get('/locations/query', getLocations);  // Dynamic location queries
router.get('/locations/:id', getLocationById);  // Specific location by ID
router.post('/locations', createLocation);  // Create a new location
router.patch('/locations/:id', updateLocation);  // Update a specific location
router.delete('/locations/:id', deleteLocation);  // Delete a specific location

// Specific Searches
router.get('/countries', async (req, res) => {  // Fetch all countries
    try {
        const countries = await db.collection('locations').distinct("country");
        res.json(countries);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error('Error fetching countries:', error);
    }
});

// Trips Routes
router.get('/locations/:locationId/trips', getAllTripsByLocation);  // Get all trips for a location
router.post('/locations/:locationId/trips', createTripForLocation);  // Create a trip for a specific location

// Advanced Search for Trips by City or State
router.get('/locations/search/:query/trips', async (req, res) => {
    console.log("Route hit with query:", req.params.query);
    try {
        const trips = await Trip.find({
            "location": {
                $elemMatch: {
                    $or: [
                        { "city": { $regex: req.params.query, $options: 'i' } },
                        { "state": { $regex: req.params.query, $options: 'i' } }
                    ]
                }
            }
        });
        console.log('Trips found:', trips);
        if (trips.length > 0) {
            res.json(trips);
        } else {
            res.status(404).json({ message: "No trips found for this location." });
        }
    } catch (error) {
        console.error('Error fetching trips by location:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
