const config = require("config");
const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token) return res.status(401).json({ msg: "Unauthorized" });

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // Add user from payload to request
    req.user = decoded;

    next();
  } catch (e) {
    return res.status(400).json({ msg: "Forbidden" });
  }
};
