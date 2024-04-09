import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  country: {
    type: String, 
    required: true
  },
  city: {
    type: String, 
    required: true
  },
  // Reference to trips
  trips: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip' // Reference to the Trip model
  }]
});


const tripsSchema = new mongoose.Schema({
  date: {
    type: Number, 
    required: true
  },
  comments: {
    type: String, 
    required: false
  },
  photo: {
    type: String, 
    required: true
  }, // ref to location
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location', // ref to the Location model
    required: true
  }
});

const Location = mongoose.model('Location', locationSchema);
const Trip = mongoose.model('Trip', tripsSchema);

export { Location, Trip };