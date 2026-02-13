const os=require("os");

console.log("OS Platform:", os.platform());
console.log("CPU architecture:", os.arch());
console.log(os.cpus());
console.log("CPU Cores:", os.cpus().length);
console.log("Free Memory:", os.freemem());
console.log("Total Memory:", os.totalmem());
console.log(os.hostname());
console.log(os.homedir());
console.log(os.tmpdir());
console.log(os.uptime());
