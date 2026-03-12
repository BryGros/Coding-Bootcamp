// RBAC Blog Server - Role-Based Access Control Example
const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 4200;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Register all routes
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`RBAC Blog Server running on http://localhost:${PORT}`);
  console.log('\nRole Hierarchy:');
  console.log('  user      - Create/edit own posts');
  console.log('  moderator - Flag/edit any post');
  console.log('  admin     - Full access (delete posts, manage users)');
  console.log('\nTest Accounts (register with these roles):');
  console.log('  {"username": "admin", "email": "admin@test.com", "password": "admin123", "role": "admin"}');
  console.log('  {"username": "mod", "email": "mod@test.com", "password": "mod123", "role": "moderator"}');
  console.log('  {"username": "user", "email": "user@test.com", "password": "user123", "role": "user"}');
});
