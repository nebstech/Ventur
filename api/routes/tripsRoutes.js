import express from 'express';
import {
  getAllTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
  getAllTripsByLocation,
  createTripForLocation,
  addLocationToTrip
} from '../controllers/tripsController.js'

const router = express.Router();

router.get('/', getAllTrips); // get all trips
router.get('/:id', getTripById); // get trip by id
router.post('/', createTrip); // create a new trip
router.patch('/:id', updateTrip); // update a trip
router.delete('/:id', deleteTrip); // delete a trip
router.get('/location/:locationId', getAllTripsByLocation); // Get all trips associated with a specific location
router.post('/location/:locationId', createTripForLocation); // Create a new trip associated with a specific location
router.post('/trip/:tripId/location', addLocationToTrip);

export default router;