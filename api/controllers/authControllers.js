import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv/config.js';

export const signup = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
    const user = await User.create(req.body).catch(error => {
      console.error('Validation error:', error);
      res.status(400).json({ error: error.message });
    });
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' })
  }
};

export const login = async (req, res) => {
  try {
      const user = await User.findOne({ username: req.body.username });
      if (user) {
          const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
          if (isPasswordValid) {
              const payload = { userId: user._id, username: user.username };
              const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Adjust the expiresIn as needed
              res.json({ message: 'Login successful', token });
          } else {
              res.status(400).json({ error: 'Incorrect password' });
          }
      } else {
          res.status(404).json({ error: 'User not found' });
      }
  } catch (error) {
      res.status(500).json({ error: 'Server error during login' });
  }
};



export const logout = async (req, res) => { 
  res.clearCookie('token').json({ message: 'Logout successful' });
}
