type Task<T = unknown> = () => Promise<T>;
interface JobOptions {
    priority?: number;
    retries?: number;
    timeout?: number;
}
export default class PQueue {
    private limit;
    private maxQueueSize;
    private front;
    private rear;
    private running;
    private jobId;
    constructor(limit?: number, maxQueueSize?: number);
    enqueue<T>(task: Task<T>, options?: JobOptions): Promise<T>;
    private insertByPriority;
    private process;
    private execute;
    size(): number;
    isEmpty(): boolean;
}
export {};
//# sourceMappingURL=PQueueue.d.ts.map