const User = require('../models/userModel');
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');

// @desc Register a new user
// @route api/v1/users
// @access Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    re.status(400);
    throw new Error('Please include all fields');
  }

  // Find if user already exists
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
};

// @desc Login a user
// @route api/v1/users/login
// @access Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists and then if paswords match
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Credentials');
  }
};

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

module.exports = {
  registerUser,
  loginUser,
};
