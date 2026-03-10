let users = [
  {
    id: 1,
    name: "John Doe", // required, min 2 chars
    email: "John@example.com", // required, valid email
    role: "author", // optional: admin|author|reader (default: author)
    createdAt: "Dec 15, 2025",
    lastUpdate: "Dec 15, 2025",
  },
];

const getAllUsers = (req, res) => {
  // getAllUsers() - Return all users
  res.json({
    count: users.length,
    users,
  });
};

const getUserById = (req, res) => {
  // getUserById() - Find and return specific user
  const { id } = req.params;
  const user = users.find((user) => user.id === parseInt(id));
  if (!user) {
    return res.status(404).json({
      error: "User not found",
      requestedUserId: id,
    });
  }
  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      lastUpdate: user.lastUpdate,
    },
  });
};

const createUser = (req, res) => {
  // createUser() - Validate and add new user
  const { name, email, role } = req.body;

  if (!name || !email) {
    let message;
    if (!name) {
      message = "You must enter a name";
    } else {
      message = "You must enter an email address";
    }
    return res.status(400).json({
      error: message,
      received: { name, email },
    });
  }

  if (name.length < 2) {
    return res.status(400).json({
      error: "Your name must be at least two characters",
      enteredName: name,
    });
  }

  const atIndex = email.indexOf("@");
  const dotIndex = email.lastIndexOf(".");

  if (atIndex < 0 || dotIndex < atIndex) {
    return res.status(400).json({
      error: "You must enter a valid email address",
      enteredEmail: email,
    });
  }

  if (role) {
    if (role != "admin" && role != "author" && role != "reader") {
      return res.status(400).json({
        error: "You must select a role of admin, author, or reader",
        enteredRole: role,
      });
    }
  }
  const newDate = new Date().toDateString();
  const newUser = {
    id: users.length + 1,
    name,
    email,
    role: role || "reader",
    createdAt: newDate,
    lastUpdate: newDate,
  };

  users.push(newUser);
  res.status(201).json({
    message: "User created successfully",
    user: newUser,
  });
};

const updateUser = (req, res) => {
  // updateUser() - Find and update existing user
  const { id } = req.params;
  const { name, email, role } = req.body;

  let userIndex = users.findIndex((user) => user.id === parseInt(id));

  if (userIndex === -1) {
    return res.status(404).json({
      error: "User not found",
      requestedId: id,
    });
  }

  if (name && name.length < 2) {
    return res.status(400).json({
      error: "Your name must be at least two characters",
      enteredName: name,
    });
  }
  if (email) {
    const atIndex = email.indexOf("@");
    const dotIndex = email.lastIndexOf(".");

    if (atIndex < 0 || dotIndex < atIndex) {
      return res.status(400).json({
        error: "You must enter a valid email address",
        enteredEmail: email,
      });
    }
  }

  if (role) {
    if (role != "admin" && role != "author" && role != "reader") {
      return res.status(400).json({
        error: "You must select a role of admin, author, or reader",
        enteredRole: role,
      });
    }
  }

  const updateDate = new Date().toDateString();
  const initUserDet = users[userIndex];

  users[userIndex] = {
    id: parseInt(id),
    name: name || initUserDet.name,
    email: email || initUserDet.email,
    role: role || initUserDet.role,
    createdAt: initUserDet.createdAt,
    lastUpdated: updateDate,
  };
  res.json({
    message: "User Updated Succesfully!",
    user: users[userIndex],
  });
};

const deleteUser = (req, res) => {
  // deleteUser() - Find and remove user
  const { id } = req.params;

  let userIndex = users.findIndex((user) => user.id === parseInt(id));

  if (userIndex === -1) {
    return res.status(404).json({
      error: "User not found",
      requestedId: id,
    });
  }

  const deletedUser = users.splice(userIndex, 1)[0];
  res.json({
    message: "User deleted successfully",
    deletedUser,
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
