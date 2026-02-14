// Object Type 
var user;
user = {
    name: "Srish",
    age: 21
};
var u = {
    name: "Srish",
    age: 21
};
var obj = {
    a: 10,
    b: 20,
    add: function () {
        return this.a + this.b;
    },
    sub: function () {
        return this.a - this.b;
    }
};
console.log(obj.add());
var Calculator = /** @class */ (function () {
    function Calculator(a, b) {
        if (a === void 0) { a = 0; }
        if (b === void 0) { b = 0; }
        this.a = a;
        this.b = b;
        // public : anywhere 
        // private : Only inside class
        // protected : Class + subclasses
        this.c = 12;
        this.a = a;
        this.b = b;
    }
    Calculator.prototype.add = function () {
        var _a;
        return ((_a = this.a) !== null && _a !== void 0 ? _a : 0) + this.b;
    };
    Calculator.prototype.sub = function () {
        return this.a - this.b;
    };
    return Calculator;
}());
var c1 = new Calculator();
