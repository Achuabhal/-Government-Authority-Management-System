const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format: Bearer <token>

  if (!token) return res.status(401).json({ message: "Access Denied. No Token Provided." });
  console.log("Verifying token:", token);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid or Expired Token" });

    req.user = decoded; // save decoded payload to use later
    next();
  });
}

module.exports = verifyToken;
