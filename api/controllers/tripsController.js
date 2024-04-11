import { Trip } from '../models/Trips.js';
import { Location } from '../models/Location.js';

export const createTrip = async (req, res) => {
  try {
    // Assume req.user contains the authenticated user's information
    const userId = req.user ? req.user._id : null;

    const { country, state, city } = req.body;
    const location = await Location.findOne({ country, state, city });

    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    const tripDetails = {
      name: req.body.name,
      comment: req.body.comment,
      location: location._id,
      user: userId // Associate trip with the user
    };

    if (req.file) {
      tripDetails.image = req.file.path;
    }

    const trip = await Trip.create(tripDetails);
    res.status(201).json(trip);
  } catch (error) {
    console.error(error);
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
    // Find all trips associated with the specified locationId
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

// In your trip controller file

export const addLocationToTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { country, state, city } = req.body;
    
    // Here you would find the location or create a new one based on the country, state, and city
    let location = await Location.findOne({ country, state, city });
    if (!location) {
      location = await Location.create({ country, state, city });
    }

    // Now, associate this location with the trip
    const trip = await Trip.findByIdAndUpdate(
      tripId,
      { $addToSet: { location: location._id } }, // Assuming location is an array in Trip schema
      { new: true }
    );

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.status(200).json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding location to trip' });
  }
};
