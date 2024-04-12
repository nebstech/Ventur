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

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, comment } = req.body;
  try {
      const updatedTrip = await Trip.findByIdAndUpdate(id, { name, comment }, { new: true });
      if (!updatedTrip) {
          return res.status(404).json({ message: 'Trip not found' });
      }
      res.json(updatedTrip);
  } catch (error) {
      console.error('Error updating trip:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


export default router;
