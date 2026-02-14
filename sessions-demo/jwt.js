const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3002;

app.use(express.json());

// fake DB
const USERS = {
  srish: "1234"
};

// secret key (keep this safe!)
const JWT_SECRET = "super-secret-jwt-key";

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // 1. validate user
  if (USERS[username] !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // 2. create token payload
  const payload = {
    username: username
  };

  // 3. sign JWT
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "5m"
  });

  // 4. send token
  res.json({
    message: "Login successful",
    token: token
  });
});

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Bearer TOKEN

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // attach user info
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

app.get("/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: `Welcome ${req.user.username}`,
    user: req.user
  });
});