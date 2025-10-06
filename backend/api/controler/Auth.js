const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.cookies.authToken;
  console.log("Auth Middleware - Token from cookies:", token);
  if (!token) {
    console.log("No token found"); // Only log when token is missing
    return res.status(401).json({ authenticated: false });
  }

try {
  console.log("Trying to verify JWT...");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  console.log("Authenticated user:", req.user);
  next();
} catch (err) {
  console.log("JWT verification failed:", err.message);
  return res.status(403).json({ authenticated: false });
}

}

module.exports = authMiddleware;
