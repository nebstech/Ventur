import mongoose from "mongoose";

const tripsSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true
  },
  location: {
    type: [{
      country: { type: String, required: true },
      state: { type: String, required: true },
      city: { type: String, required: true }
    }],
    required: true
  },
  comments: {
    type: String, 
    required: false
  }
});

const Trip = mongoose.model('Trip', tripsSchema);

export { Trip };
