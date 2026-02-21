"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const PORT = 4000;
const user_routes_1 = __importDefault(require("./routes/user.routes"));
app_1.default.use("/", (req, res, next) => {
    console.log(req.url, req.method);
    next();
});
app_1.default.get("/", (req, res) => {
    res.render("Home", { title: "Home" });
});
// Mental Model of Request 
// Request<Params, ResBody, ReqBody, Query>
`Request<
  { id: string },                // params          //
  {},                           //  res body       //
  Omit<User, "id">,            //   request body  //
  { filter: string }          //    query        //
>`;
app_1.default.use("/acc", user_routes_1.default);
const server = http_1.default.createServer(app_1.default);
server.listen(PORT, () => {
    console.log("Server is Online");
});
//# sourceMappingURL=server.js.map