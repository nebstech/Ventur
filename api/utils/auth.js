import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from './models/User.js';

const isUserLoggedIn = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error('No token provided');
    }

    const payload = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.userId);

    if (!user) {
      throw new Error('User not found');
    }
    
    const isPasswordValid = await bcrypt.compare(req.body.password, user.hashedPassword);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export default isUserLoggedIn;
