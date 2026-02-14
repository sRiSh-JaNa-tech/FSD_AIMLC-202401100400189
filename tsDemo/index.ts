let age : number = 20;
let userName : string = "Srish";
let isStudent : boolean = true;
let x = 10;

//Arrays ->
let arr : number[] = [1,2,3];
let names : string[] = ["a","b"];
//let array = [];
let arr1 : (number | string)[] = [1, "a"];

//Functions -> 
function add(a: number, b : number) : number{
    return a + b;
}
const mul = (a : number, b : number) : number => a * b;
let data : any = 10;

//Unknown values Handling -> 
let value : unknown;
value = "Hello";
if(typeof value === "string"){
    console.log(value.length);
}
let num : unknown;
num = 12;
if(typeof num === "number"){
    console.log("It is number");
}
