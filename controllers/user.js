const bcrypt = require("bcryptjs");

// User Model
const user = require("../models/user");

// Create a new user
exports.Create = (req, res, next) => {
  const { name, email, password } = req.body;
  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  user.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "Email already exists" });

    // Create new user
    const newUser = new User({
      name,
      email,
      password,
    });

    // Generate salt
    bcrypt.genSalt(10, (err, salt) => {
      // Create hash for password
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        // Save user
        newUser.save().then((user) => {
          // Next middleware
          next();
        });
      });
    });
  });
};

// Read a user
exports.Read = (req, res) => {
  user
    .findById(req.user.id)
    .select("-_id -password -__v")
    .then((user) => {
      if (!user) return res.status(400).json({ msg: "User does not exist" });
      res.json({ user });
    })
    .catch((err) => {
      throw err;
    });
};

// Update a user
exports.Update = (req, res) => {
  user
    .findById(req.user.id)
    .then((user) => {
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      const name = req.body.name ? req.body.name : user.name;
      const email = req.body.email ? req.body.email : user.email;

      if (name !== user.name || email !== user.email) {
        if (email !== user.email) {
          User.findOne({ email }).then((user) => {
            if (user)
              return res.status(400).json({ msg: "Email already exists" });
          });
        }
        user.name = name;
        user.email = email;
        user.save((err) => {
          if (err) throw err;
          const { name, email, date } = user;
          return res.json({ user: { name, email, date } });
        });
      } else {
        return res.json({ msg: "Nothing to update" });
      }
    })
    .catch((err) => {
      throw err;
    });
};

// Delete a user
exports.Delete = (req, res) => {
  user
    .findById(req.user.id)
    .select("-password")
    .then((user) => {
      if (!user) return res.status(400).json({ msg: "User does not exist" });
      else {
        user.deleteOne({ _id: req.user.id }, (err) => {
          if (err) throw err;
          else {
            return res.sendStatus(200);
          }
        });
      }
    })
    .catch((err) => {
      throw err;
    });
};
