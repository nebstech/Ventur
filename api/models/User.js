import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String, 
    required: true,
    unique: true, 
    minlength: 3,
    maxlength: 20,
    match: /^[a-zA-Z0-9-_]+$/
  },
  password: {
    type: String, 
    required: true, 
    minlength: 8,
    maxlength: 100
  }
})

const User = mongoose.model('User', userSchema);

export default User