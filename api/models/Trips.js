import mongoose from "mongoose";

const tripsSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true
  },
  comments: {
    type: String, 
    required: false
  },
  location: {
    type: [{
      country: { type: String, required: true },
      state: { type: String, required: true },
      city: { type: String, required: true }
    }],
    required: true
  }
});

const Trip = mongoose.model('Trip', tripsSchema);

export { Trip };
