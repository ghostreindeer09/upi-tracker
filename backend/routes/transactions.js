const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { validateTransaction } = require('../middleware/validate');
const Transaction = require('../models/Transaction');

// @route   POST api/transactions
// @desc    Create a transaction
// @access  Private
router.post('/', auth, validateTransaction, async (req, res) => {
  const { amount, type, app, date, note } = req.body;

  try {
    // Create new transaction
    const newTransaction = new Transaction({
      user: req.user.id,
      amount,
      type,
      app,
      date,
      note
    });

    // Save transaction to database
    const transaction = await newTransaction.save();
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// @route   GET api/transactions
// @desc    Get all transactions for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Find transactions for the current user
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// @route   GET api/transactions/summary
// @desc    Get transaction summary for a user
// @access  Private
router.get('/summary', auth, async (req, res) => {
  try {
    // Find transactions for the current user
    const transactions = await Transaction.find({ user: req.user.id });
    
    // Calculate totals
    const totalSent = transactions
      .filter(t => t.type === 'Sent')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const totalReceived = transactions
      .filter(t => t.type === 'Received')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const totalCashback = transactions
      .filter(t => t.type === 'Cashback')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const netFlow = totalReceived + totalCashback - totalSent;
    
    res.json({
      totalSent,
      totalReceived,
      totalCashback,
      netFlow
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/transactions/:id
// @desc    Delete a transaction
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // Find transaction by ID
    const transaction = await Transaction.findById(req.params.id);

    // Check if transaction exists
    if (!transaction) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }

    // Check if user owns the transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Delete transaction
    await transaction.deleteOne();
    res.json({ msg: 'Transaction removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Transaction not found' });
    }
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;