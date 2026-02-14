import { Request, Response, NextFunction } from "express";
import PQueue  from "../sec_modules/PQueueue";

const queue = new PQueue(2);

export const rateLimiter = (priority : number) => {
    return ( req: Request, res: Response, next: NextFunction ) => {
        queue.enqueue(
            () => {
                return new Promise<void>((resolve) => {
                    res.on("finish", resolve);
                    res.on("close", resolve);
                    next();
                });
            },
            { priority, retries : 2 }
        );
    };
};