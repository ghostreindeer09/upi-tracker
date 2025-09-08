const validator = require('validator');

// Validation middleware functions
const validateRegister = (req, res, next) => {
  const { email, password } = req.body;
  const errors = {};

  // Validate email
  if (!email) {
    errors.email = 'Email is required';
  } else if (!validator.isEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Validate password
  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  // Return errors if any
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = {};

  // Validate email
  if (!email) {
    errors.email = 'Email is required';
  }

  // Validate password
  if (!password) {
    errors.password = 'Password is required';
  }

  // Return errors if any
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

const validateTransaction = (req, res, next) => {
  const { amount, type, app, date } = req.body;
  const errors = {};

  // Validate amount
  if (!amount && amount !== 0) {
    errors.amount = 'Amount is required';
  } else if (isNaN(amount) || amount <= 0) {
    errors.amount = 'Amount must be a positive number';
  }

  // Validate type
  if (!type) {
    errors.type = 'Transaction type is required';
  } else if (!['Sent', 'Received', 'Cashback'].includes(type)) {
    errors.type = 'Transaction type must be Sent, Received, or Cashback';
  }

  // Validate app
  if (!app) {
    errors.app = 'App name is required';
  }

  // Validate date
  if (!date) {
    errors.date = 'Date is required';
  } else if (!validator.isISO8601(String(date))) {
    errors.date = 'Please enter a valid date';
  }

  // Return errors if any
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateTransaction
};