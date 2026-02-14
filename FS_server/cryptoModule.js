const crypto = require("crypto");

const password = "Srish123";
const hash = crypto.createHash("sha256").update(password).digest("hex");
console.log("Hashed Password : ", hash, "length : " , hash.toString().length);
console.log("Original Password : ", password);

const token = crypto.randomBytes(16).toString("hex");
console.log("Resest link : ", token);

crypto.scrypt(password, "salt", 64, (err, derivedKey) => {
    if(!err){
        console.log("Derived Key : ",derivedKey.toString("hex"));
    }
});


