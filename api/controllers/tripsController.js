import { Trip } from '../models/Trips.js';
import { Location } from '../models/Location.js';

export const createTrip = async (req, res) => {
  try {
    // Check if the provided location exists
    const location = await Location.findById(req.body.location);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    // Create the trip with the provided location
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

export const getAllTripsByLocation = async (req, res) => {
  try {
    // Check if the provided location exists
    const location = await Location.findById(req.params.locationId);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    // Get all trips associated with the location
    const trips = await Trip.find({ location: req.params.locationId });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving trips' });
  }
};

export const createTripForLocation = async (req, res) => {
  try {
    // Check if the provided location exists
    const location = await Location.findById(req.params.locationId);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    // Add location ID to the trip data
    req.body.location = req.params.locationId;
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ error: 'Error creating trip' });
  }
};
