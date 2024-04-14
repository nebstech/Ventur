import express from 'express';
import {
  getAllTripsByLocation,
  createTripForLocation,
  updateLocation,
  deleteLocation,
  createLocation,
  getLocationById,
  getAllLocations
} from '../controllers/locationController.js';

const router = express.Router();

router.get('/locations', getAllLocations);
router.get('/locations/:id', getLocationById);
router.post('/locations', createLocation);
router.patch('/locations/:id', updateLocation);
router.delete('/locations/:id', deleteLocation);

router.get('/locations/:locationId/trips', getAllTripsByLocation);
router.post('/locations/:locationId/trips', createTripForLocation);

router.get('/locations/search/:query/trips', async (req, res) => {
  console.log("Searching trips for:", req.params.query); // Debug: log the incoming query
  try {
      const trips = await Trip.find({
          $or: [
              {"location.city": {$regex: req.params.query, $options: 'i'}},
              {"location.state": {$regex: req.params.query, $options: 'i'}}
          ]
      });
      if (trips.length > 0) {
          res.json(trips);
      } else {
          res.status(404).json({ message: "No trips found for this location." });
      }
  } catch (error) {
      console.error('Error fetching trips:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;