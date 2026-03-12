// Joi validation schemas for request validation

const Joi = require('joi');

// Validation schema for user registration
const registerSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.base': 'Username must be a string',
      'string.alphanum': 'Username can only contain letters and numbers',
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username cannot exceed 30 characters',
      'any.required': 'Username is required'
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),

  password: Joi.string()
    .min(6)
    .max(128)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.max': 'Password cannot exceed 128 characters',
      'any.required': 'Password is required'
    }),

  firstName: Joi.string()
    .max(50)
    .required()
    .messages({
      'string.max': 'First name cannot exceed 50 characters',
      'any.required': 'First name is required'
    }),

  lastName: Joi.string()
    .max(50)
    .required()
    .messages({
      'string.max': 'Last name cannot exceed 50 characters',
      'any.required': 'Last name is required'
    })
});

// Validation schema for user login
const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),

  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required'
    })
});

// Validation schema for creating a post
const createPostSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(200)
    .required()
    .messages({
      'string.min': 'Title must be at least 3 characters long',
      'string.max': 'Title cannot exceed 200 characters',
      'any.required': 'Title is required'
    }),

  content: Joi.string()
    .min(10)
    .max(5000)
    .required()
    .messages({
      'string.min': 'Content must be at least 10 characters long',
      'string.max': 'Content cannot exceed 5000 characters',
      'any.required': 'Content is required'
    }),

  tags: Joi.array()
    .items(Joi.string().max(30))
    .max(5)
    .messages({
      'array.max': 'You can add up to 5 tags only',
      'string.max': 'Each tag cannot exceed 30 characters'
    }),

  status: Joi.string()
    .valid('draft', 'published', 'archived')
    .messages({
      'any.only': 'Status must be draft, published, or archived'
    })
});

// Validation schema for updating a post
const updatePostSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(200)
    .messages({
      'string.min': 'Title must be at least 3 characters long',
      'string.max': 'Title cannot exceed 200 characters'
    }),

  content: Joi.string()
    .min(10)
    .max(5000)
    .messages({
      'string.min': 'Content must be at least 10 characters long',
      'string.max': 'Content cannot exceed 5000 characters'
    }),

  tags: Joi.array()
    .items(Joi.string().max(30))
    .max(5)
    .messages({
      'array.max': 'You can add up to 5 tags only',
      'string.max': 'Each tag cannot exceed 30 characters'
    }),

  status: Joi.string()
    .valid('draft', 'published', 'archived')
    .messages({
      'any.only': 'Status must be draft, published, or archived'
    })
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

// Validation schema for updating user role
const updateRoleSchema = Joi.object({
  role: Joi.string()
    .valid('user', 'moderator', 'admin')
    .required()
    .messages({
      'any.only': 'Role must be user, moderator, or admin',
      'any.required': 'Role is required'
    })
});

// Validation schema for creating a comment
const createCommentSchema = Joi.object({
  content: Joi.string()
    .min(1)
    .max(1000)
    .required()
    .messages({
      'string.min': 'Comment must be at least 1 character long',
      'string.max': 'Comment cannot exceed 1000 characters',
      'any.required': 'Comment content is required'
    }),

  parentComment: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      'string.pattern.base': 'Invalid parent comment ID format'
    })
});

// Validation schema for refresh token
const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string()
    .required()
    .messages({
      'any.required': 'Refresh token is required'
    })
});

module.exports = {
  registerSchema,
  loginSchema,
  createPostSchema,
  updatePostSchema,
  updateRoleSchema,
  createCommentSchema,
  refreshTokenSchema
};
