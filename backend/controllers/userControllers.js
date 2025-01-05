
const db = require('../config/db');

// Create a new user
const createUser = (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Insert the user into the database
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, password], (err, results) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(201).json({ message: 'User created successfully', userId: results.insertId });
  });
};

module.exports = { createUser };
