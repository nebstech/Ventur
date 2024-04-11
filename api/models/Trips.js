import mongoose from "mongoose";
import User from "./User.js"; 

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
  },
  location: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference the User model here
    required: true
  }
});

const Trip = mongoose.model('Trip', tripsSchema);

export { Trip };
