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