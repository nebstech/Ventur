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
  }
});

const Location = mongoose.model('Location', locationSchema);
export { Location };
