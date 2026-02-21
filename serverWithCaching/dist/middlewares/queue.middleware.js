"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = void 0;
const PQueueue_1 = __importDefault(require("../sec_modules/PQueueue"));
const queue = new PQueueue_1.default(2);
const rateLimiter = (priority) => {
    return (req, res, next) => {
        queue.enqueue(() => {
            return new Promise((resolve) => {
                res.on("finish", resolve);
                res.on("close", resolve);
                next();
            });
        }, { priority, retries: 2 });
    };
};
exports.rateLimiter = rateLimiter;
//# sourceMappingURL=queue.middleware.js.map