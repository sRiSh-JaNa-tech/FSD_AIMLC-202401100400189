const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// GET
app.get("/", (req, res) => {
    res.send("First Express Server."); // res.send in express, res.end in node
});

app.get("/file", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/jfile", (req, res) => {
    res.sendFile(path.join(__dirname, "data.json"));
});

// POST
app.post("/data", (req, res) => {
    res.send("POST request received");
});

// PUT
app.put("/data", (req, res) => {
    res.send("PUT request received");
});

// DELETE
app.delete("/data", (req, res) => {
    res.send("DELETE request received");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});