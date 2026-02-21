"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const queue_middleware_1 = require("../middlewares/queue.middleware");
const router = express_1.default.Router();
router.post("/user/:id", (0, queue_middleware_1.rateLimiter)(2), (req, res) => {
    const id = Number(req.params.id);
    const { name, age } = req.body;
    if (!name || isNaN(Number(age))) {
        return res.status(400).json({ error: "Invalid data" });
    }
    const user = {
        id,
        name: name || "Default",
        age: age ? Number(age) : 0
    };
    res.status(200).json(user);
});
router.get("/user/:id", (0, queue_middleware_1.rateLimiter)(4), (req, res) => {
    const id = Number(req.params.id);
    const { name, age } = req.query;
    if (!name || typeof Number(age) !== "number") {
        return res.status(400).json({ error: "Invalid Data" });
    }
    const user = {
        id,
        name: name || "Default",
        age: age ? Number(age) : 0
    };
    res.status(200).json(user);
});
exports.default = router;
//# sourceMappingURL=user.routes.js.map