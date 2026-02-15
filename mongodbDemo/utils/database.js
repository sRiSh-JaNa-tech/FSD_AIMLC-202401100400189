const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;

const url = "<Mondo DB URL>";

const mongoConnect = (callback) => {
    MongoClient.connect(url)
    .then((client)=>{
        console.log("Connected to MongoDB");
        _db = client.db("authApp");
        client.on('close', () => {
            console.log("Lost Connection to MongoDB");
            _db = null;
        }); 
        callback();
    })
    .catch((err) => {
        console.log(err);
        throw err;
    });
};

const getDb = () =>{
    if(_db){
        return _db;
    }
    throw "No database found!";
};

module.exports = {mongoConnect, getDb};
