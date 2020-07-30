const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// User Model
const user = require("../models/user");

exports.token = (req, res, next) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  user.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "Email does not exist" });

    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      // Create and send token
      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: "3h" },
        (err, token) => {
          if (err) throw err;
          const { name, email, date } = user;
          return res.json({ token, user: { name, email, date } });
        }
      );

      // Next middleware
      next();
    });
  });
};
