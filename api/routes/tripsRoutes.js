import express from 'express';
import {
  getAllTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip
} from '../controllers/tripsController.js'

const router = express.Router();

router.get('/', getAllTrips); // get all trips
router.get('/:id', getTripById); // get trip by id
router.post('/', createTrip); // create a new trip
router.patch('/:id', updateTrip); // update a trip
router.delete('/:id', deleteTrip); // delete a trip

export default router;