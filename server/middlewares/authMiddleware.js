      
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
//const movies = require("../models/movieModel");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  const token = authHeader.split(" ")[1];
 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
     // req.user = decoded;
    next();
  } catch (err) {
    console.error("Token error:", err.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }

};

module.exports = authMiddleware;
