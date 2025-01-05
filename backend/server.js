const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

// Initialize the app
dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
