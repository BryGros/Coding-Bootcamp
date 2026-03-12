// User model with authentication, validation, and role-based access control

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema with comprehensive validation and security
const userSchema = new mongoose.Schema({
  // Username must be unique and follow specific format
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot exceed 30 characters'],
    match: [/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, hyphens, and underscores']
  },

  // Email must be unique and valid format
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },

  // Password will be hashed before saving
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    // Never include password in query results by default
    select: false
  },

  // User's first and last name
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },

  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },

  // Role-based access control
  // Only three valid roles: user, moderator, admin
  role: {
    type: String,
    enum: {
      values: ['user', 'moderator', 'admin'],
      message: '{VALUE} is not a valid role'
    },
    default: 'user'
  },

  // Track when user was created and last updated
  isActive: {
    type: Boolean,
    default: true
  },

  // Track last login time
  lastLogin: {
    type: Date
  },

  // Store refresh tokens for token rotation strategy
  refreshTokens: [{
    token: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Automatically delete refresh tokens after 7 days
      expires: 604800
    }
  }]
}, {
  // Automatically add createdAt and updatedAt timestamps
  timestamps: true
});

// Create indexes for frequently queried fields to improve performance
// This makes searching by email or username much faster
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ role: 1 });

// Virtual property: fullName
// This creates a computed field that combines firstName and lastName
// Virtuals are not stored in MongoDB but calculated when accessed
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual property: postCount
// This creates a virtual populate to count user's posts
userSchema.virtual('postCount', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author',
  count: true
});

// Pre-save middleware: Hash password before saving
// This runs automatically before a user document is saved
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate a salt for hashing
    // The number 10 is the salt rounds (higher = more secure but slower)
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the salt
    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (error) {
    next(error);
  }
});

// Instance method: Compare entered password with hashed password
// This is called on a specific user document
// Example: user.matchPassword('myPassword123')
userSchema.methods.matchPassword = async function(enteredPassword) {
  try {
    // Use bcrypt to compare the plain text password with the hashed password
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    return isMatch;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

// Instance method: Check if user has required role
// This helps with authorization checks
userSchema.methods.hasRole = function(requiredRole) {
  const roleHierarchy = {
    'user': 1,
    'moderator': 2,
    'admin': 3
  };

  // Check if user's role level is equal to or higher than required role
  return roleHierarchy[this.role] >= roleHierarchy[requiredRole];
};

// Instance method: Update last login time
userSchema.methods.updateLastLogin = async function() {
  this.lastLogin = Date.now();
  await this.save({ validateBeforeSave: false });
};

// Instance method: Add refresh token to user
userSchema.methods.addRefreshToken = async function(token) {
  // Add the new refresh token to the array
  this.refreshTokens.push({ token });

  // Keep only the last 5 refresh tokens (for multiple devices)
  if (this.refreshTokens.length > 5) {
    this.refreshTokens = this.refreshTokens.slice(-5);
  }

  await this.save({ validateBeforeSave: false });
};

// Instance method: Remove refresh token (for logout)
userSchema.methods.removeRefreshToken = async function(token) {
  this.refreshTokens = this.refreshTokens.filter(rt => rt.token !== token);
  await this.save({ validateBeforeSave: false });
};

// Static method: Find user by credentials (for login)
// This is called on the User model itself
// Example: User.findByCredentials('email@example.com', 'password123')
userSchema.statics.findByCredentials = async function(email, password) {
  // Find user by email and include the password field
  const user = await this.findOne({ email }).select('+password');

  // If no user found, throw error
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check if account is active
  if (!user.isActive) {
    throw new Error('Account has been deactivated');
  }

  // Verify the password
  const isPasswordMatch = await user.matchPassword(password);

  if (!isPasswordMatch) {
    throw new Error('Invalid email or password');
  }

  // Return the user without the password
  user.password = undefined;
  return user;
};

// Static method: Get user statistics (aggregation example)
userSchema.statics.getUserStatistics = async function() {
  const statistics = await this.aggregate([
    {
      // Group by role and count
      $group: {
        _id: '$role',
        count: { $sum: 1 },
        activeUsers: {
          $sum: { $cond: ['$isActive', 1, 0] }
        }
      }
    },
    {
      // Rename _id to role for clarity
      $project: {
        _id: 0,
        role: '$_id',
        totalUsers: '$count',
        activeUsers: 1
      }
    },
    {
      // Sort by role
      $sort: { role: 1 }
    }
  ]);

  return statistics;
};

// Configure toJSON to remove sensitive fields when user is converted to JSON
userSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    // Remove sensitive fields from output
    delete ret.password;
    delete ret.refreshTokens;
    delete ret.__v;
    return ret;
  }
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
