`
prototype chain is a core concept in JavaScript’s inheritance model.
It allows objects to inherit properties and methods from other objects.
When you try to access a property or method on an object, JavaScript first looks for it on that object itself.
If it’s not found, the engine looks up the object's internal [[Prototype]] reference (accessible via Object.getPrototypeOf(obj) or the deprecated __proto__ property)
`

function Person(){}
const person1 = new Person();

console.log(Object.getPrototypeOf(person1) === Person.prototype);

const animal = {
    eats : true,
    walks(){
        console.log("Hello");
    }
};

const elephant = {
    heavy : true,
    __proto__ : animal 
}

console.log(elephant.eats);
elephant.walks();
