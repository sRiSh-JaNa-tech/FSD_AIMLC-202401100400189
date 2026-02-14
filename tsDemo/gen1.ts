//Generics 
//1. Generic Function
function identity<T>(value : T): T{
    return value;
}

//Generic Array 
function getFirst<T>(arr : T[]){
    return arr[0];
}

//generic Interface
interface Box<T>{
    readonly value : T;
}

const box: Box<number> = { value: 10 };