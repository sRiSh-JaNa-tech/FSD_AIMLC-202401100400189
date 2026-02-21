type Task = () => Promise<void>;
export declare class Queue {
    private limit;
    private front;
    private rear;
    private running;
    private processing;
    constructor(limit?: number);
    enqueue(task: Task): void;
    private process;
}
export default Queue;
//# sourceMappingURL=Queue.d.ts.map