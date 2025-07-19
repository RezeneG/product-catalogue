// controllers/transactionController.js
const { performTransaction } = require('../services/transactionService');

async function handleTransaction(req, res) {
  try {
    const userId = await performTransaction(req.body.name);
    res.json({ success: true, userId });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { handleTransaction };
