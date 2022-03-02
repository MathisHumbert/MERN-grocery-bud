const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;
  const auth = req.headers.authorization;

  if (auth && auth.startsWith('Bearer')) {
    try {
      // Get token from header
      token = auth.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized');
  }
};

module.exports = protect;
