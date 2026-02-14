function withTimeout(promise, ms) {
    return Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Task timeout")), ms)
        )
    ]);
}

class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class Queue{
    constructor(limit = 4){
        this.front = null;
        this.rear = null;
        this.running = 0;
        this.limit = limit;
        this.processing = false;
    }
    
    enqueue(value){
        if(this.running >= this.limit){
            console.log("Limit reached");
            return;
        }
 
        const newNode = new Node(value);
        
        if(!this.rear){
            this.front = this.rear = newNode;
            this.running++;
        }else{
            this.rear.next = newNode;
            this.rear = newNode;
            this.running++; 
        }
        this.process();
    }
    
    async process(){
        if(this.processing){return;}
        if(!this.front){return;}
        this.processing = true;
        
        const result = this.front;
        this.front = this.front.next;
        if(!this.front){
            this.rear = null;
        }
        
        try{
            await withTimeout(result.value(), 5000);
            this.running--;
        }catch(err){
            console.error("Task failed : ", err);
        }
        
        this.processing = false;
        this.process();  
    }
    isEmpty(){
        return this.front === null;
    }   
}

module.exports = { Queue };