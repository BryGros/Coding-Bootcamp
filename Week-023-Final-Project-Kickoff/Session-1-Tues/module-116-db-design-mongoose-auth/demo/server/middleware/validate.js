// Validation middleware using Joi schemas

// Middleware factory to validate request body against a Joi schema
const validate = (schema) => {
  return (req, res, next) => {
    // Validate the request body against the schema
    const { error, value } = schema.validate(req.body, {
      // Remove unknown fields from the request body
      stripUnknown: true,
      // Stop validation at first error
      abortEarly: false
    });

    // If validation fails, return error response
    if (error) {
      // Extract all error messages
      const errorMessages = error.details.map(detail => detail.message);

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errorMessages
      });
    }

    // Replace request body with validated and sanitized value
    req.body = value;

    // Continue to next middleware
    next();
  };
};

// Middleware to validate MongoDB ObjectId format
const validateObjectId = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];

    // Check if ID matches MongoDB ObjectId format (24 hex characters)
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;

    if (!objectIdPattern.test(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid ${paramName} format. Must be a valid MongoDB ObjectId.`
      });
    }

    next();
  };
};

// Middleware to sanitize string inputs (prevent XSS)
const sanitizeInput = (req, res, next) => {
  // Function to recursively sanitize strings in an object
  const sanitize = (obj) => {
    if (typeof obj === 'string') {
      // Remove HTML tags and trim whitespace
      return obj.replace(/<[^>]*>/g, '').trim();
    }

    if (Array.isArray(obj)) {
      return obj.map(item => sanitize(item));
    }

    if (obj !== null && typeof obj === 'object') {
      const sanitized = {};
      for (const key in obj) {
        sanitized[key] = sanitize(obj[key]);
      }
      return sanitized;
    }

    return obj;
  };

  // Sanitize request body
  if (req.body) {
    req.body = sanitize(req.body);
  }

  // Sanitize query parameters
  if (req.query) {
    req.query = sanitize(req.query);
  }

  next();
};

module.exports = {
  validate,
  validateObjectId,
  sanitizeInput
};
