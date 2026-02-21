const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street : String,
    city : String,
    state : String,
    zip : String  
});

const userSchema = new mongoose.Schema({
    name : String,
    age : {
        type : Number,
        min : 2,
        max : 120,
        validate : {
            validator : v => v % 2 === 0,
            message : props => `${props.value} is not an even number!`
        }
    },
    email : {
        type : String,
        minlength : 11,
        required : true,
        lowercase : true
    },
    createdAt : {
        type : Date,
        default : () => Date.now(),
        immutable : true
    },
    updatedAt : {
        type : Date,
        default : () => Date.now(),
        immutable : false
    },
    bestFriend : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    hobbies : [String],
    address : addressSchema
});


userSchema.methods.sayHi = function() {
    console.log(`Hi, my name is ${this.name}`);
}

userSchema.statics.findByName = function(name) { // Can be used direclty to query
    return this.find({name : new RegExp(name, 'i')});
} 

userSchema.query.byName = function(name) {
    return this.where({name : new RegExp(name, 'i')});
}

userSchema.virtual("fullName").get(function () {
    return this.firstName + " " + this.lastName;
});

module.exports = mongoose.model('User', userSchema);