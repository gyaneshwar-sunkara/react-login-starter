const express = require("express");
const router = express.Router();

// Auth middleware
const { auth } = require("../../middleware/auth");

// Token generator
const { token } = require("../../jwt/token");

// User controllers
const { Create, Read, Update, Delete } = require("../../controllers/user");

// @route   POST api/user
// @desc    Register new user
// @access  Public
router.post("/", Create, token, (req, res) => res);

// @route   GET api/user
// @desc    Get user data
// @access  Private
router.get("/", auth, Read);

// @route   PATCH api/user
// @desc    Update user data
// @access  Private
router.patch("/", auth, Update);

// @route   DELETE api/auth/user
// @desc    Remove user
// @access  Private
router.delete("/", auth, Delete);

module.exports = router;
