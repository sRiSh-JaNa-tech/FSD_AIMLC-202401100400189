// Advance Types 
let value : string | number;
value = "hello";
value = 12;

//Type alias 
type ID = number | string;
function printID(id : ID){
    console.log(id);
}

printID(101);
printID("abc");

//function types 
type AddFunction = (a: number, b: number) => number;
const add: AddFunction = (x, y) => {
    return x + y;
};

console.log(add(10, 20));

// Type example Real life
// 1
type Status = "success" | "error" | "pending";
function handleStatus(status : Status){
    if(status === "success"){
        console.log("Done");
    }
}
// 2
type Callback = (message : string) => void;
function process(callback : Callback){
    callback("Hello");
}
process((msg) => console.log(msg));

//diff beween interface and type 
`
    1. interface is extended and type is increased using type 
    2. can be merged and type cannot be merged.
    3. Type can do more complex things.
`

// Intersection Types 
type A = {x : number};
type B = {y : string};
type C = A & B;

// Literal Types
let direction : "left" | "right";
direction = "left"; //ok
