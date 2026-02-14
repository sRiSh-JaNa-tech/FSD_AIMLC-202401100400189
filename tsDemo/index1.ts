// Object Type 
let user : {name : string, age : number};

user = {
    name : "Srish",
    age : 21
}

// Interface in Typescript 
interface User {
    readonly id ?: number,
    name : string,
    age ?: number // Optinal it can be or dont need to be defined 
} // Optional is equivalent to number | undefined

const u : User = {
    name : "Srish",
    age : 21
}

interface Mathfunc{
    a : number,
    b : number,
    add() : number,
    sub() : number
}

let obj : Mathfunc = {
    a  : 10,
    b  : 20,
    add(){
        return this.a + this.b;
    },
    sub(){
        return this.a - this.b;
    }
};

console.log(obj.add());

class Calculator implements Mathfunc{
    // public : anywhere 
    // private : Only inside class
    // protected : Class + subclasses
    private c : number = 12;
    constructor(public a : number = 0,public b : number = 0){
        this.a = a;
        this.b = b;
    }
    add(){
        return (this.a ?? 0) + this.b;
    }
    sub(){
        return this.a - this.b;
    }
}

const c1 = new Calculator();

