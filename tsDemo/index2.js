// Advance Types 
var value;
value = "hello";
value = 12;
function printID(id) {
    console.log(id);
}
printID(101);
printID("abc");
var add = function (x, y) {
    return x + y;
};
console.log(add(10, 20));
function handleStatus(status) {
    if (status === "success") {
        console.log("Done");
    }
}
function process(callback) {
    callback("Hello");
}
process(function (msg) { return console.log(msg); });
// Literal Types
var direction;
direction = "left"; //ok
