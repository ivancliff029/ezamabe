import jwt from "jsonwebtoken";
import User from "../models/User.js"; 

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token ID, exclude password
      // We attach this 'user' object to the request so the next middleware can use it
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// 2. Authorization: Checks if the user is a Super Admin
export const superAdminOnly = (req, res, next) => {
  // Check if user exists (from protect) and if role matches
  if (req.user && req.user.role === "superadmin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Super Admins only" });
  }
};