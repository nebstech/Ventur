import { Trip } from '../models/Trips.js';

export const createTrip = async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ error: 'Error creating trip' });
  }
};

export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving trips' });
  }
};

export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if(!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving trip' });
  }
};

export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: 'Error updating trip' });
  }
}

export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if(!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting trip' });
  }
};