const {Queue} = require("../sec_modules/Queue");
const express = require("express");
const http = require('http');
const PORT = 4000;

const app = express();
let processes = new Queue();

app.get("/task",(req,res,next) =>{
    console.log("Request Recieved. ");
    let cancelled = false;
    
    req.on("close",()=>{
        cancelled = true;
        console.log("Client disconnected.");
    });
    
    processes.enqueue(async () =>{
        if(cancelled){
            return;
        }
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        console.log("Finished Processing");
        res.status(200).json({ message: "Task completed" });
    });
});

const server = http.createServer(app);
server.listen(PORT,()=>{
    console.log("Server is online");
});

