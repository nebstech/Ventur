import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  country: {
    type: String, 
    required: true
  },
  state: {
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

const Location = mongoose.model('Location', locationSchema);
export { Location };