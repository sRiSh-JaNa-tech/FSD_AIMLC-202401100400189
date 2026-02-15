import express from "express";
import { Request, Response } from "express";
import { rateLimiter } from "../middlewares/queue.middleware";
import path from "path";

const router = express.Router();
type User = {
    readonly id : number,
    name : string,
    age : number
};

router.post("/user/:id", rateLimiter(2),
    (req: Request<{id : string},{}, {name ?: string, age ?: string}>, res : Response) => {
        const id = Number(req.params.id);
        const {name, age} = req.body;
        if (!name || isNaN(Number(age))) {
            return res.status(400).json({ error: "Invalid data" });
        }
        const user : User = {
            id,
            name : name || "Default",
            age : age ? Number(age) : 0
        };
        res.status(200).json(user);
    }
);

router.get(
    "/user/:id", rateLimiter(4),
    (req: Request<{ id: string }, {}, {}, { name?: string; age?: string}>, res: Response) => {

        const id = Number(req.params.id);
        const { name, age } = req.query;

        if (!name || typeof Number(age) !== "number") {
            return res.status(400).json({ error: "Invalid Data" });
        }

        const user: User = {
            id,
            name: name || "Default",
            age: age ? Number(age) : 0
        };

        res.status(200).json(user);
    }
);

export default router;
