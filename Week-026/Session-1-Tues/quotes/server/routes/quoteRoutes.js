const express = require('express');
const router = express.Router();
const { getAllQuotes } = require('../controllers/quoteController');

// GET /api/quotes - Retrieve all quotes
router.get('/', getAllQuotes);

module.exports = router;
