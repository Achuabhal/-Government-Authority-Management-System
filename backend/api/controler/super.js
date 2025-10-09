const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authMiddleware(req, res, next) {
  const token = req.cookies.authToken;
  console.log("Auth Middleware - Token from cookies:", token);
  if (!token) {
    console.log("No token found");
    return res.status(401).json({ authenticated: false });
  }

  try {
    console.log("Trying to verify JWT...");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const user = await User.findOne({ email: req.user.email });
    
    console.log("Authenticated user:", req.user);
    
    // Check role
    if (user.role !== "superadmin") {
      console.log("Role not superadmin");
      return res.status(403).json({ message: "Not allowed" });
    }
    
    next();
  } catch (err) {
    console.log("JWT verification failed:", err.message);
    return res.status(403).json({ authenticated: false });
  }
}

module.exports = authMiddleware;