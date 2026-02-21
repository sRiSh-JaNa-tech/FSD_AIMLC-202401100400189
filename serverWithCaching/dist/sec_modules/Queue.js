"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
function withTimeout(promise, ms) {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error("Task timeout")), ms))
    ]);
}
class Node {
    value;
    next = null;
    constructor(value) {
        this.value = value;
    }
}
class Queue {
    limit;
    front = null;
    rear = null;
    running = 0;
    processing = false;
    constructor(limit = 4) {
        this.limit = limit;
    }
    enqueue(task) {
        const node = new Node(task);
        if (!this.rear) {
            this.front = this.rear = node;
        }
        else {
            this.rear.next = node;
            this.rear = node;
        }
        this.process();
    }
    async process() {
        if (this.processing)
            return;
        if (!this.front)
            return;
        if (this.running >= this.limit)
            return;
        this.processing = true;
        const node = this.front;
        this.front = this.front.next;
        if (!this.front)
            this.rear = null;
        this.running++;
        try {
            await withTimeout(node.value(), 5000);
        }
        catch (err) {
            console.error("Task failed:", err);
        }
        this.running--;
        this.processing = false;
        this.process(); // next task
    }
}
exports.Queue = Queue;
exports.default = Queue;
//# sourceMappingURL=Queue.js.map