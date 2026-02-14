import http from "http";
import {NextFunction, Request, Response} from "express";
import app from "./app";

const PORT = 4000;

import userRouter from "./routes/user.routes";

app.use("/",(req : Request, res : Response, next : NextFunction) => {
    console.log(req.url, req.method);
    next();
});

app.get("/", (req : Request, res : Response) => {
    res.render("Home",{title : "Home"});
});

// Mental Model of Request 
// Request<Params, ResBody, ReqBody, Query>
`Request<
  { id: string },                // params          //
  {},                           //  res body       //
  Omit<User, "id">,            //   request body  //
  { filter: string }          //    query        //
>`

app.use("/acc", userRouter);

const server = http.createServer(app);
server.listen(PORT,()=>{
    console.log("Server is Online");
});