// User Model with Role-Based Access Control
// This model includes a role field for RBAC

// In-memory storage for users
const users = [];

// ID counter for generating unique user IDs
let userIdCounter = 1;

// User model object
const User = {
  // Get all users
  getAll() {
    return users;
  },

  // Find user by ID
  findById(userId) {
    return users.find(user => user.id === userId);
  },

  // Find user by username
  findByUsername(username) {
    return users.find(user => user.username === username);
  },

  // Find user by email
  findByEmail(email) {
    return users.find(user => user.email === email);
  },

  // Find user by username or email
  findByUsernameOrEmail(username, email) {
    return users.find(user => user.username === username || user.email === email);
  },

  // Create a new user
  create(userData) {
    const newUser = {
      id: userIdCounter++,
      username: userData.username,
      email: userData.email,
      password: userData.password,
      role: userData.role || 'user',  // Default role is 'user'
      createdAt: new Date()
    };

    users.push(newUser);
    return newUser;
  },

  // Update user role (admin only)
  updateRole(userId, newRole) {
    const user = users.find(u => u.id === userId);

    if (!user) {
      return null;
    }

    user.role = newRole;
    return user;
  },

  // Delete user by ID
  deleteById(userId) {
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return false;
    }

    users.splice(userIndex, 1);
    return true;
  },

  // Get user without password field
  getSafeUser(user) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    };
  },

  // Count users by role
  countByRole(role) {
    return users.filter(u => u.role === role).length;
  }
};

// Export the User model
module.exports = User;
