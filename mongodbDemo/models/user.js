const { getDb } = require('../utils/database');

class User {
    constructor(username, password) {
        this.name = username;
        this.password = password;
    }

    // CREATE
    save() {
        const db = getDb();
        return db.collection('users')
            .insertOne(this)
            .then(result => {
                console.log("User Saved!");
                return result;
            })
            .catch(err => console.log(err));
    }

    // READ
    static fetchAll() {
        const db = getDb();
        return db.collection('users')
            .find()
            .toArray();
    }

    static searchByName(name) {
        const db = getDb();
        return db.collection('users').findOne({ name });
    }

    static searchByNameAll(name) {
        const db = getDb();
        return db.collection('users')
            .find({ name })
            .toArray();
    }

    // UPDATE
    static updatePassword(username, newPassword) {
        const db = getDb();
        return db.collection('users').updateOne(
            { name: username },
            { $set: { password: newPassword } }
        );
    }

    static updatePasswordMany(username, newPassword) {
        const db = getDb();
        return db.collection('users').updateMany(
            { name: username },
            { $set: { password: newPassword } }
        );
    }

    // DELETE
    static delete(username, All) {
        const db = getDb();
        if(All){
            console.log("Deleting All");
            return db.collection('users').deleteMany({ name: username });
        }else{
            console.log("Deleting One");
            return db.collection('users').deleteOne({ name: username });
        }
    }

}

module.exports = User;