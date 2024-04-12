import express from 'express';
import multer from 'multer';
import {
  getAllTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  saveTrip,
  getTripsByLocation
} from '../controllers/tripsController.js';


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', getAllTrips);
router.get('/:id', getTripById);
router.post('/', upload.single('image'), saveTrip);
router.patch('/:id', updateTrip);
router.delete('/:id', deleteTrip);
router.get('/by-location/:locationId', getTripsByLocation);

export default router;
