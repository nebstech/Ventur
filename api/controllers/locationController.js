import { Location } from '../models/Location/Location.js';

export const addLocation = async (req, res) => {
  try {
    const location = await Location.create(req.body);
    res.status(201).json(location);
  } catch (error) {
    res.status(404).json({ error: 'Error creating location '});
  }
};