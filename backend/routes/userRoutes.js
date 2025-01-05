

const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/userControllers');

// Endpoint to create a user
router.post('/create', createUser);

module.exports = router;