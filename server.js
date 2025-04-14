const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());
GEMINI_API_KEY='AIzaSyA2vDYfA7AD_uBNqjLNxnWoRIk8UAupGuU'
// Dummy users array
let users = [
  { email: 'test@example.com', password: 'test123' },
  { email: 'john@example.com', password: 'john123' },
  { email: 'devansh@gmail.com', password: 'primfy' }
];

//  POST /login - Login a user
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email) {
    return res.status(400).json({ error: 'Email cannot be empty' });
  }
  if (!password) {
    return res.status(400).json({ error: 'Password cannot be empty' });
  }

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.status(200).json({
      message: 'Login successful',
      user: { email: user.email }
    });
  } else {
    res.status(401).json({ error: 'Invalid email or password' });
  }
});

//  GET /users - View all users
app.get('/users', (req, res) => {
  res.status(200).json({ users });
});

//  PUT /users/:email - Update a user's password
app.put('/users/:email', (req, res) => {
  const email = req.params.email;
  const { password } = req.body;

  const userIndex = users.findIndex(u => u.email === email);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (!password) {
    return res.status(400).json({ error: 'New password cannot be empty' });
  }

  users[userIndex].password = password;
  res.status(200).json({ message: 'Password updated successfully', user: users[userIndex] });
});

//  DELETE /users/:email - Delete a user
app.delete('/users/:email', (req, res) => {
  const email = req.params.email;

  const userIndex = users.findIndex(u => u.email === email);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.splice(userIndex, 1);
  res.status(200).json({ message: 'User deleted successfully' });
});

//  Root route for testing
app.get('/', (req, res) => {
  res.send('Server is running very fast');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
