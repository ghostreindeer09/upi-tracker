const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['Sent', 'Received', 'Cashback'],
    required: true
  },
  app: {
    type: String,
    enum: ['GPay', 'PhonePe', 'Paytm'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  note: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);