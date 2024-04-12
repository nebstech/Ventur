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

export default router;