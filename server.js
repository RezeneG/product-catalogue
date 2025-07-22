const transactionService = require('./services/transactionService');

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const pool = require('./models/db');
const { performTransaction } = require('./services/transactionService');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'yourSecret',
    resave: false,
    saveUninitialized: true
}));

// Authentication
// ... login/logout endpoints ...

// Protected product APIs
// ... GET /api/products, POST, PUT, DELETE ...

// 🔄 Transaction API
app.post('/api/transaction', async (req, res) => {
  try {
    const { name } = req.body;
    const newUserId = await performTransaction(name);
    res.json({ success: true, userId: newUserId });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
