const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3002;

const users = {
    srish : "1234"
}

app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.get("/login", (req, res) => {
  res.send(`
    <h2>Login</h2>
    <form method="POST" action="/login">
      <input name="username" placeholder="Username" required /><br><br>
      <input name="password" type="password" placeholder="Password" required /><br><br>
      <button>Login</button>
    </form>
  `);
});

app.post("/login",(req,res) => {
    const {username, password} = req.body;

    if(users[username] === password){
        res.cookie("user", username, {
            httpOnly : true,
            maxAge : 5 * 1000
        });

        return res.redirect("/dashboard");
    }

    res.send("Invalid credentails");
});

app.get("/dashboard", (req, res) => {
  const user = req.cookies.user;

  if (!user) {
    return res.redirect("/login");
  }

  res.send(`
    <h1>Welcome ${user} 👋</h1>
    <p>You are logged in using cookies 🍪</p>
    <a href="/logout">Logout</a>
  `);
});

app.get("/logout", (req, res) => {
  res.clearCookie("user");
  res.send("✅ Logged out. <a href='/login'>Login again</a>");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});