import mongoose from "mongoose";

const tripsSchema = new mongoose.Schema({
  date: {
    type: String, 
    required: true
  },
  comments: {
    type: String, 
    required: false
  },
  photo: {
    type: String, 
    required: false
  }, // ref to location
  location: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location', // ref to the Location model
    required: true
  }]
});

const Trip = mongoose.model('Trip', tripsSchema);

export { Trip };