import { Trip } from '../models/Trips.js';
import { Location } from '../models/Location.js';

export const saveTrip = async (req, res) => {
  console.log("Received data:", req.body);
  try {
      const { name, comments, country, state, city } = req.body;

      console.log('Location data:', { country, state, city });
      if (!country || !state || !city) {
          throw new Error('Missing location information');  // Handling missing location info
      }

      const location = {
          country,
          state,
          city
      };

      const trip = new Trip({
        name,
        comments,  
        location: [location]
      });
      console.log(req.body);
      await trip.save();
      res.status(201).json(trip);
  } catch (error) {
      console.error('Error saving trip:', error);
      res.status(500).json({
          error: 'Error saving trip',
          message: error.message  // Provide error details
      });
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
      if (!trip) {
          return res.status(404).json({ error: 'Trip not found' });
      }
      res.json(trip);
  } catch (error) {
      res.status(500).json({ error: 'Error updating trip' });
  }
}

export const deleteTrip = async (req, res) => {
  console.log("Attempting to delete trip with ID:", req.params.id);
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) {
      console.log("No trip found with ID:", req.params.id);
      return res.status(404).json({ error: 'Trip not found' });
    }
    console.log("Trip deleted successfully:", req.params.id);
    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error("Error deleting trip with ID:", req.params.id, error);
    res.status(500).json({ error: 'Error deleting trip' });
  }
};

export const getTripsByLocation = async (req, res) => {
  try {
      const locationId = req.params.locationId;
      const trips = await Trip.find({ location: locationId }).populate('location');
      res.status(200).json(trips);
  } catch (error) {
      console.error('Error fetching trips by location:', error);
      res.status(500).json({ error: 'Error fetching trips' });
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


export const searchTripsByQuery = async (req, res) => {
  const query = req.params.query;
  try {
    const trips = await Trip.find({
      $or: [
        {"name": {$regex: query, $options: 'i'}},
        {"location.city": {$regex: query, $options: 'i'}},
        {"location.state": {$regex: query, $options: 'i'}}
      ]
    });
    if (!trips.length) {
      return res.status(404).json({message: 'No trips found matching your query.'});
    }
    res.json(trips);
  } catch (error) {
    console.error('Error searching for trips:', error);
    res.status(500).json({error: 'Internal server error'});
  }
};