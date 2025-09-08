const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Token has expired, please login again' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ msg: 'Invalid token format' });
    }
    res.status(401).json({ msg: 'Token is not valid', error: err.message });
  }
};