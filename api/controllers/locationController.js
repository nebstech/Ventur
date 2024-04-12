import { Location } from '../models/Location.js';

export const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving locations' });
  }
};

export const getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving location' });
  }
};


export const createLocation = async (req, res) => {
  try {
    const location = await Location.create(req.body);
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ error: 'Error creating location' });
  }
};


export const updateLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: 'Error updating location' });
  }
};

export const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.json({ message: 'Location deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting location' });
  }
};

export const getAllTripsByLocation = async (req, res) => {
  try {
    const locationId = req.params.locationId;
    const trips = await Trip.find({ "location._id": locationId }).populate('location');
    res.json(trips);
  } catch (error) {
    console.error('Error retrieving trips by location:', error);
    res.status(500).json({ error: 'Error retrieving trips' });
  }
};

export const createTripForLocation = async (req, res) => {
  try {
    // Add location ID to the trip data
    req.body.location = req.params.locationId;
    // Assuming Trip is imported and available
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ error: 'Error creating trip' });
  }
};

