import express from "express";
import path from "path";

const app = express();

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.set("view engine","ejs");
app.set('views', path.join(__dirname,"views"));

export default app;