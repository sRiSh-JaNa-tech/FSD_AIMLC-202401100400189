type Task<T = unknown> = () => Promise<T>;

interface JobOptions {
    priority?: number;
    retries?: number;
    timeout?: number; // ms
}

interface Job<T = unknown> {
    id: number;
    task: Task<T>;
    priority: number;
    retries: number;
    timeout: number;
}

class Node<T = unknown> {
    job: Job<T>;
    next: Node<T> | null = null;

    constructor(job: Job<T>) {
        this.job = job;
    }
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
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

export default class PQueue {
    private front: Node | null = null;
    private rear: Node | null = null;

    private running = 0;
    private jobId = 0;

    constructor(private limit = 4, private maxQueueSize = 1000) {}

    // Add Job
    enqueue<T>(
        task: Task<T>,
        options: JobOptions = {}
    ): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const job: Job<T> = {
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
                    } catch (err) {
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
    private insertByPriority(node: Node): void {
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

        while (
            current.next &&
            current.next.job.priority <= node.job.priority
        ) {
            current = current.next;
        }

        node.next = current.next;
        current.next = node;

        if (!node.next) this.rear = node;
    }

    // Process Jobs
    private process(): void {
        while (this.running < this.limit && this.front) {
            const node = this.front;
            this.front = this.front.next;

            if (!this.front) this.rear = null;

            this.running++;

            console.log(`🚀 Running job ${node.job.id}`);

            this.execute(node.job);
        }
    }

    private async execute(job: Job): Promise<void> {
        try {
            await withTimeout(job.task(), job.timeout);
            console.log(`Job ${job.id} completed`);
        } catch (err) {
            console.error(`Job ${job.id} failed`, err);
            if (job.retries > 0) {
                const delay = 1000 * Math.pow(2, (3 - job.retries));

                console.log(
                    `🔁 Retrying job ${job.id} in ${delay}ms (left: ${job.retries})`
                );

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

    size(): number {
        let count = 0;
        let curr = this.front;
        while (curr) {
            count++;
            curr = curr.next;
        }
        return count;
    }

    isEmpty(): boolean {
        return this.front === null;
    }
}