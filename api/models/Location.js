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
  cities: [{ 
    type: String, 
    required: true
  }],
  trips: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip' 
  }]
});

const Location = mongoose.model('Location', locationSchema);
export { Location };
