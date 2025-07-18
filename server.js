const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session config
app.use(session({
  secret: 'replace_this_with_a_strong_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

// Simple in-memory product store
let products = [];

// Middleware to protect admin routes
function requireLogin(req, res, next) {
  if (req.session && req.session.loggedIn) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    req.session.loggedIn = true;
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Logout endpoint
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).json({ error: 'Logout failed' });
    } else {
      res.json({ success: true });
    }
  });
});

// Get all products (protected)
app.get('/api/products', requireLogin, (req, res) => {
  res.json(products);
});

// Add new product (protected)
app.post('/api/products', requireLogin, (req, res) => {
  const { name, description, price, category } = req.body;
  if (!name || !description || price == null || !category) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const newProduct = { id: Date.now(), name, description, price, category };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Delete product by ID (protected)
app.delete('/api/products/:id', requireLogin, (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter(p => p.id !== id);
  res.json({ success: true });
});
// Update product by ID (protected)
app.put('/api/products/:id', requireLogin, (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description, price, category } = req.body;

  if (!name || !description || price == null || !category) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  products[productIndex] = { id, name, description, price, category };
  res.json(products[productIndex]);
});


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
