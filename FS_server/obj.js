`There are many ways to create objects in js`

// Object literal synatax 
let object = {
name : "Srish",
age : 20
};
// Object contructor 
let obj = Object();

// Object's create Method 
let vehicle = {
  wheels: "4",
  fuelType: "Gasoline",
  color: "Green",
};
let carProps = {
  type: {
    value: "Volkswagen",
  },
  model: {
    value: "Golf",
  },
};

var car = Object.create(vehicle, carProps);
console.log(car);

//function prototype 
function Person(){}
Person.prototype.name = "Sudheer";
let object = new Person();

// Object assing method 
const orgObject = { company: "XYZ Corp" };
const carObject = { name: "Toyota" };
const staff = Object.assign({}, orgObject, carObject);

