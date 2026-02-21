"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Node {
    job;
    next = null;
    constructor(job) {
        this.job = job;
    }
}
function withTimeout(promise, ms) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error("Task Timeout"));
        }, ms);
        promise
            .then((res) => {
            clearTimeout(timer);
            resolve(res);
        })
            .catch((err) => {
            clearTimeout(timer);
            reject(err);
        });
    });
}
class PQueue {
    limit;
    maxQueueSize;
    front = null;
    rear = null;
    running = 0;
    jobId = 0;
    constructor(limit = 4, maxQueueSize = 1000) {
        this.limit = limit;
        this.maxQueueSize = maxQueueSize;
    }
    // Add Job
    enqueue(task, options = {}) {
        return new Promise((resolve, reject) => {
            const job = {
                id: ++this.jobId,
                task,
                priority: options.priority ?? 5,
                retries: options.retries ?? 0,
                timeout: options.timeout ?? 5000
            };
            const node = new Node({
                ...job,
                task: async () => {
                    try {
                        const result = await job.task();
                        resolve(result);
                        return result;
                    }
                    catch (err) {
                        reject(err);
                        throw err;
                    }
                }
            });
            // Prevent overflow
            if (this.size() >= this.maxQueueSize) {
                reject(new Error("Queue Overflow"));
                return;
            }
            this.insertByPriority(node);
            console.log(`Job ${job.id} added (priority ${job.priority})`);
            this.process();
        });
    }
    // Insert based on priority
    insertByPriority(node) {
        if (!this.front) {
            this.front = this.rear = node;
            return;
        }
        // higher priority (lower number)
        if (node.job.priority < this.front.job.priority) {
            node.next = this.front;
            this.front = node;
            return;
        }
        let current = this.front;
        while (current.next &&
            current.next.job.priority <= node.job.priority) {
            current = current.next;
        }
        node.next = current.next;
        current.next = node;
        if (!node.next)
            this.rear = node;
    }
    // Process Jobs
    process() {
        while (this.running < this.limit && this.front) {
            const node = this.front;
            this.front = this.front.next;
            if (!this.front)
                this.rear = null;
            this.running++;
            console.log(`🚀 Running job ${node.job.id}`);
            this.execute(node.job);
        }
    }
    async execute(job) {
        try {
            await withTimeout(job.task(), job.timeout);
            console.log(`Job ${job.id} completed`);
        }
        catch (err) {
            console.error(`Job ${job.id} failed`, err);
            if (job.retries > 0) {
                const delay = 1000 * Math.pow(2, (3 - job.retries));
                console.log(`🔁 Retrying job ${job.id} in ${delay}ms (left: ${job.retries})`);
                setTimeout(() => {
                    this.enqueue(job.task, {
                        priority: job.priority,
                        retries: job.retries - 1,
                        timeout: job.timeout
                    });
                }, delay);
            }
        }
        this.running--;
        this.process();
    }
    size() {
        let count = 0;
        let curr = this.front;
        while (curr) {
            count++;
            curr = curr.next;
        }
        return count;
    }
    isEmpty() {
        return this.front === null;
    }
}
exports.default = PQueue;
//# sourceMappingURL=PQueueue.js.map