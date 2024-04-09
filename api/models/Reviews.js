import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
  text: {
    type: String, 
    required: true
  }, 
  rating: {
    type: Number, 
    required: false
  },
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  }
})

const Review = mongoose.model('Review', reviewsSchema);
export { Review };