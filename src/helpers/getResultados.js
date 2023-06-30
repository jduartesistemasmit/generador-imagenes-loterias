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
    const resultados = {hour:'00:00 AM', a:'- - -',b:'- - -',zod:{num:'- - -',sg:'- - -'}};
    
    const hour = getHour("24").split(":")[0];
    await axios.get(url, { headers }).then(({ data }) => {
        if (range(hour, 13, 15)) {
            resultados.hour = "01:00 PM"
            resultados.a = data[154].num;    
            resultados.b = data[155].num;    
            resultados.zod = {num: data[160].num, sg:data[160].sg};    
        }
        if (range(hour, 16, 21)) {
            resultados.hour = "04:00 PM"
            resultados.a = data[154].num;    
            resultados.b = data[155].num;    
            resultados.zod = data[160].num;    
        }
        if (range(hour, 22, 0)) {
            resultados.hour = "10:00 PM"
            resultados.a = data[154].num;    
            resultados.b = data[155].num;    
            resultados.zod = data[160].num;    
        }
    });
    return resultados;
};

const getTripleGanaSuperGanaZod = async () => {
    const resultados = {
        hour:'00:00 AM',
        supergana:{
            num: '- - - -',
            sg:'- - -'
        },  
        triplegana:{
            num: '- - -',
            sg:'- - -'
        }  
    };
    
    const hour = getHour("24").split(":")[0];
    await axios.get(url, { headers }).then(({ data }) => {
        if (range(hour, 13, 15)) {
            resultados.hour = "01:00 PM"
            resultados.supergana = {num:data[151].num, sg:data[151].sg};    
            resultados.triplegana = {num:data[183].num, sg:data[183].sg};    
        }
        if (range(hour, 16, 21)) {
            resultados.hour = "04:00 PM"
          resultados.supergana = {num:data[152].num, sg:data[152].sg};    
            resultados.triplegana = {num:data[184].num, sg:data[184].sg};  
        }
        if (range(hour, 22, 0)) {
            resultados.hour = "10:00 PM"
           resultados.supergana = {num:data[153].num, sg:data[153].sg};    
            resultados.triplegana = {num:data[185].num, sg:data[185].sg};   
        }
    });
    return resultados;
};

module.exports = { getPiramidNumbers, getTripleTachiraZod, getTripleGanaSuperGanaZod };
