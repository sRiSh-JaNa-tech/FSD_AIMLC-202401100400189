import express from "express";
import http from "http";
import userRoutes from "./routes/user.routes"

const PORT : number = 4000;
const app = express();

app.use(express.json());

// Home Routes
app.get("/", (req, res) => {
    res.send("Server running 🚀");
});

// User routes
app.use("/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});