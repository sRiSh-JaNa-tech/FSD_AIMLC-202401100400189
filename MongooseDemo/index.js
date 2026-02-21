const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL).then((() => {
    console.log("Connected to MongoDB");
})).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

async function saveUser() {
    // const user = await User.create({ name : "Srish", age : 22, email : "srish@example.com");
    const user = new User({ 
        name : "Srish",
        age : 24,
        email : "srish@example.com",
        createdAt : new Date(),
        updatedAt : new Date(),
        hobbies : ["coding", "gaming"],
        address : {
            street : "123 Main St",
            city : "Anytown",
            state : "CA",
            zip : "12345"
        },
        bestFriend : null
    });
    await user.save().then((user) => {
        console.log("User saved successfully");
        console.log(user);
    }).catch((err) => {
        console.error("Error saving user:", err.message);
    });
    const user2 = await User.findOne({name : "Srish"});
    console.log(user2);
}

(async () => {
    //await saveUser();
    const user1 = await User.where('age').equals(24).limit(2).where("name").equals("Srish").populate('bestFriend');
    console.log(user1);
})();
