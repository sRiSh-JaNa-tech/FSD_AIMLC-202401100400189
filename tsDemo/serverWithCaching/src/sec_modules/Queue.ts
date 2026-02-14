type Task = () => Promise<void>;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    return Promise.race([
        promise,
        new Promise<T>((_, reject) =>
            setTimeout(() => reject(new Error("Task timeout")), ms)
        )
    ]);
}

class Node {
    value: Task;
    next: Node | null = null;

    constructor(value: Task) {
        this.value = value;
    }
}

export class Queue {
    private front: Node | null = null;
    private rear: Node | null = null;
    private running = 0;
    private processing = false;

    constructor(private limit = 4) {}

    enqueue(task: Task): void {
        const node = new Node(task);

        if (!this.rear) {
            this.front = this.rear = node;
        } else {
            this.rear.next = node;
            this.rear = node;
        }

        this.process();
    }

    private async process(): Promise<void> {
        if (this.processing) return;
        if (!this.front) return;
        if (this.running >= this.limit) return;

        this.processing = true;

        const node = this.front;
        this.front = this.front.next;
        if (!this.front) this.rear = null;

        this.running++;

        try {
            await withTimeout(node.value(), 5000);
        } catch (err) {
            console.error("Task failed:", err);
        }

        this.running--;
        this.processing = false;

        this.process(); // next task
    }
}

export default Queue;