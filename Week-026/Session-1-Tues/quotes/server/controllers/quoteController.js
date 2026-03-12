const Quote = require('../models/Quote');

// Get all quotes from the database
const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find();

    res.status(200).json({
      success: true,
      count: quotes.length,
      data: quotes
    });
  } catch (error) {
    console.error('Error fetching quotes:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch quotes',
      error: error.message
    });
  }
};

module.exports = {
  getAllQuotes
};
