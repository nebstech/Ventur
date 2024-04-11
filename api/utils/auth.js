import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from './models/User.js';

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
      const user = await User.findOne({ username });
      if (!user) {
          return res.status(401).json({ message: 'Login failed: User not found' });
      }

      // If your stored password is hashed, compare the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      // If passwords are not hashed (not recommended), you would compare them directly:
      // const isPasswordValid = password === user.password;

      if (!isPasswordValid) {
          return res.status(401).json({ message: 'Login failed: Incorrect password' });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Login successful', token });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};


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
