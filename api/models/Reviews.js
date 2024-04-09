import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
  text: {
    type: String, 
    required: true
  }, 
  rating: {
    type: Number, 
    required: true,
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: '{value} is not an interger rating'
    }
  },
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  }
});

const Review = mongoose.model('Review', reviewsSchema);
export { Review };