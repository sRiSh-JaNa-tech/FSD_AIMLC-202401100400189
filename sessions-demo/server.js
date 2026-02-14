const express = require("express");
const session = require("express-session");

const app = express();
const PORT = 3002;

// fake database
const USERS = {
  srish: "1234"
};

app.use(express.urlencoded({ extended: true }));

// SESSION MIDDLEWARE
app.use(
  session({
    name: "login-session",
    secret: "super-secret-key", // used to sign session ID
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 5 * 60 * 1000, // 5 minutes
      httpOnly: true
    }
  })
);

/* ======================
   LOGIN PAGE
====================== */
app.get("/login", (req, res) => {
  res.send(`
    <h2>Login</h2>
    <form method="POST" action="/login">
      <input name="username" placeholder="Username" required /><br><br>
      <input type="password" name="password" placeholder="Password" required /><br><br>
      <button>Login</button>
    </form>
  `);
});

/* ======================
   LOGIN HANDLER
====================== */
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (USERS[username] === password) {
    // STORE DATA IN SESSION
    req.session.user = {
      username: username
    };

    return res.redirect("/dashboard");
  }

  res.send("❌ Invalid credentials");
});

/* ======================
   PROTECTED DASHBOARD
====================== */
app.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  res.send(`
    <h1>Welcome ${req.session.user.username} 👋</h1>
    <p>You are logged in using server-side sessions 🔐</p>
    <a href="/logout">Logout</a>
  `);
});

/* ======================
   LOGOUT
====================== */
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.send("✅ Logged out. <a href='/login'>Login again</a>");
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});