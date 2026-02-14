const ajx = () => {
    console.log("Hello");
}

const sayHi = ajx;

function hel(){
    return ajx();
};

sayHi();
hel();

