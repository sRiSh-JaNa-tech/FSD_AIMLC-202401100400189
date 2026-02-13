const url=require("url");

const myUrl=new URL("https://localhost:3000/login?user=sdmin&role=teacher");

console.log(myUrl.hostname);
console.log(myUrl.pathname);
console.log(myUrl.searchParams.get("role"));//imp
console.log(myUrl.protocol);
console.log(myUrl.port);
console.log(myUrl.search);
console.log(myUrl.toString());
console.log(myUrl.href);
