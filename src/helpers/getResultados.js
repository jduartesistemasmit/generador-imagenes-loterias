const { getFullDate, getHour, range } = require("./helpers.js");
const axios = require("axios");

const url = "https://appcelmlt.com:6444/resultadostv";
const headers = {
    "Content-Type": "application/json",
    tok: "e7f3fe7a42028493652438c8f9766b6d7b849fb2",
    desde: getFullDate("YYYYMMDD"),
    hasta: getFullDate("YYYYMMDD"),
    usu: "pepo",
};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// GENERADOR NUMEROS DE LA PIRAMIDE
const getPiramidNumbers = () => {
    let numbers = [...getFullDate()].map((element) => parseInt(element));
    let aux;
    for (let i = 0; i < 8; i++) {
        if (i == 0) aux = [...numbers];
        let newArray = [];
        for (let j = 0; j < aux.length - 1; j++) {
            let n = String(aux[j] + aux[j + 1]).padStart(2, "0");
            newArray.push(parseInt(n[1]));
        }
        aux = newArray;
        numbers = [...numbers, ...newArray];
    }
    return numbers;
};

//GENERADOR NUMEROS TRIPLE TACHIRA ZOD
const getTripleTachiraZod = async () => {
    await axios.get(url, { headers }).then(({ data }) => {
       
        const resultados = {
            a: null,
            b: null,
            zod: null
        }
        
        const hour = getHour().split(":")[0];

           resultados.a = data[154];    
           resultados.b = data[155];    
           resultados.c = data[160];    
console.log(resultados);
        // if (range(hour, 1, 3)) {
            // return [data[154],data[155],data[160]];
        // }

        //     resultados.forEach((element,index) => {
        // console.log(element.lot);
        // });
    });
};

getTripleTachiraZod();

module.exports = { getPiramidNumbers };
