require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

// Dummy user data
const users = [
  { email: "alice@example.com", password: "alice123" },
  { email: "bob@example.com", password: "bob123" },
  { email: "charlie@example.com", password: "charlie123" },
];

// POST /login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt:", req.body);

  // Validation
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  // Check credentials
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.status(200).json({
      message: "Login successful",
      user: { email: user.email }
    });
  } else {
    res.status(401).json({ error: "Invalid email or password" });
  }
});

// Default route for testing
app.get("/", (req, res) => {
  console.log("Welcome!! This is my CA");
  res.status(200).json({ message: "Server is live!" });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});