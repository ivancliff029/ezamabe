import User from "../models/User.js";
import jwt from "jsonwebtoken";

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json({ token: genToken(user._id), user },{message: "User registered successfully"});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.matchPassword(req.body.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    res.json({ token: genToken(user._id), user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
