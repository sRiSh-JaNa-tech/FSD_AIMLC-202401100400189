const {mongoConnect, getDb} = require("./utils/database");
const User = require("./models/user");
const express = require('express');
const PORT = 4000;

const app = express();
app.use(express.json());

const arr = [
    {name : 'Srish', password : '1234'},
    {name : 'Shyam', password : '5678'},
    {name : 'Ram', password : '72257'},
    {name : 'Jett2Holiday', password : '8907'}
]

app.get("/", async (req, res) => {
    try {
        const randInd = Math.floor(Math.random() * 4);
        const {name , password} = arr[randInd];
        const user = new User(name, password);
        await user.save();

        // const users = await User.fetchAll();
        res.status(200).json(await User.fetchAll());
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

app.get("/search/:name",async (req,res) =>{
    const username = req.params.name;
    console.log(username[0].toUpperCase() + username.slice(1));
    const user = await User.searchByName(username[0].toUpperCase() + username.slice(1));
    res.status(200).json(user); 
});

app.get("/delete/:name",(req,res) =>{
    const username = req.params.name[0].toUpperCase() + req.params.name.slice(1);
    const All = req.query.all || false;
    const user = User.delete(username, All);
    res.status(200).json(user);
});

mongoConnect(() => {
    app.listen(PORT, () => {
        console.log(`Working at ${PORT}`);
    })
});

