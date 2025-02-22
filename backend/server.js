const express = require('express');
const db = require('./db'); // Import the database connection
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Create a new user (POST)
app.post('/api/users', (req, res) => {
  const { username, email, password } = req.body;

  // Check if user already exists
  const checkQuery = 'SELECT * FROM users WHERE email = ? OR username = ?';
  db.query(checkQuery, [email, username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (results.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Insert new user
    const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(insertQuery, [username, email, password], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error creating user' });
      }
      res.status(201).json({ message: 'User created successfully' });
    });
  });
});

// Get all users (GET)
app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving users:', err);
      return res.status(500).send('Error retrieving users');
    }
    res.status(200).json(results);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE (username = ? OR email = ?) AND password = ?';
  db.query(query, [username, username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // User found
    res.json({ 
      success: true, 
      user: {
        id: results[0].id,
        username: results[0].username,
        email: results[0].email,
        name: results[0].name,
      country: results[0].country,
      phone: results[0].phone

      }
    });
  });
});

app.get('/api/users/:username', (req, res) => {
  const { username } = req.params;
  const query = 'SELECT username, email, name, country, phone FROM users WHERE username = ?';
  
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(results[0]);
  });
});

// Add to existing server.js
app.put('/api/users/:username', (req, res) => {
  const { username } = req.params;
  const { name, email, country, phone } = req.body;
  
  const query = 'UPDATE users SET name = ?, email = ?, country = ?, phone = ? WHERE username = ?';
  db.query(query, [name, email, country, phone, username], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'User information updated successfully' });
  });
});

// Add to server.js
app.post('/api/trips', (req, res) => {
  const { name, startDate, endDate, cost, currency, activities, userId } = req.body;
  
  const formattedStartDate = new Date(startDate).toISOString().slice(0, 19).replace('T', ' ');
  const formattedEndDate = new Date(endDate).toISOString().slice(0, 19).replace('T', ' ');
  console.log('Received trip data:', req.body);

  // Validate required fields
  if (!name || !startDate || !endDate || !userId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const tripQuery = 'INSERT INTO trips (name, start_date, end_date, cost, currency, user_id) VALUES (?, ?, ?, ?, ?, ?)';
  
  db.query(tripQuery, [name, formattedStartDate, formattedEndDate, cost || 0, currency || 'USD', userId], (err, result) => {
    if (err) {
      console.error('Database error details:', err);
      return res.status(500).json({ error: 'Error creating trip' });
    }

    const tripId = result.insertId;

    if (!activities || activities.length === 0) {
      return res.status(201).json({ message: 'Trip saved successfully', tripId });
    }

    // Format activities for insertion
    const activityValues = activities.flatMap(day => 
      day.activities.map(activity => {
        // Format time values to HH:MM:SS
        const startTime = activity.startTime ? 
          new Date(activity.startTime).toTimeString().split(' ')[0] : null;
        const endTime = activity.endTime ? 
          new Date(activity.endTime).toTimeString().split(' ')[0] : null;
    
        return [
          tripId,
          activity.title,
          activity.category,
          activity.location || null,
          startTime,
          endTime,
          day.date,
          activity.notes || null
        ];
      })
    );

    const activityQuery = 'INSERT INTO activities (trip_id, title, category, location, start_time, end_time, date, notes) VALUES ?';
    
    db.query(activityQuery, [activityValues], (actErr, actResult) => {
      if (actErr) {
        console.error('Activity insertion error:', actErr);
        return res.status(500).json({ error: 'Error saving activities' });
      }
      res.status(201).json({ message: 'Trip and activities saved successfully', tripId });
    });
});
});

// Add this endpoint
app.get('/api/trips/user/:userId', (req, res) => {
  const { userId } = req.params;
  const query = 'SELECT * FROM trips WHERE user_id = ? ORDER BY start_date';
  
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Add to server.js
app.get('/api/trips/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM trips WHERE id = ?';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    res.json(results[0]);
  });
});

app.get('/api/trips/:id/activities', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM activities WHERE trip_id = ? ORDER BY date, start_time';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

app.put('/api/trips/:id', (req, res) => {
  const { id } = req.params;
  const { name, startDate, endDate, cost, currency, activities } = req.body;
  
  const formattedStartDate = new Date(startDate).toISOString().slice(0, 19).replace('T', ' ');
  const formattedEndDate = new Date(endDate).toISOString().slice(0, 19).replace('T', ' ');

  // Update trip details
  const tripQuery = 'UPDATE trips SET name = ?, start_date = ?, end_date = ?, cost = ?, currency = ? WHERE id = ?';
  
  db.query(tripQuery, [name, formattedStartDate, formattedEndDate, cost, currency, id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Error updating trip' });
    }

    // Delete existing activities
    db.query('DELETE FROM activities WHERE trip_id = ?', [id], (deleteErr) => {
      if (deleteErr) {
        console.error('Delete error:', deleteErr);
        return res.status(500).json({ error: 'Error deleting activities' });
      }

      if (!activities || activities.length === 0) {
        return res.json({ message: 'Trip updated successfully' });
      }

      // Insert new activities
      const activityValues = activities.flatMap(day => 
        day.activities.map(activity => [
          id,
          activity.title,
          activity.category,
          activity.location || null,
          activity.startTime ? new Date(activity.startTime).toTimeString().split(' ')[0] : null,
          activity.endTime ? new Date(activity.endTime).toTimeString().split(' ')[0] : null,
          day.date,
          activity.notes || null
        ])
      );

      const activityQuery = 'INSERT INTO activities (trip_id, title, category, location, start_time, end_time, date, notes) VALUES ?';
      
      db.query(activityQuery, [activityValues], (actErr) => {
        if (actErr) {
          console.error('Activity insert error:', actErr);
          return res.status(500).json({ error: 'Error updating activities' });
        }
        res.json({ message: 'Trip and activities updated successfully' });
      });
    });
  });
});