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

//FILTRAR NUMEROS TRIPLE TACHIRA ZOD
const getTripleTachiraZod = async () => {
    const resultados = {hour:'00:00 AM', a:'- - -',b:'- - -',zod:{num:'- - -',sg:'- - -'}};
    
    const hour = getHour("24").split(":")[0];
    await axios.get(url, { headers }).then(({ data }) => {

       const loteria = [];

        data.forEach((element) => {
            if(element.pro=="TACHIRA") loteria.push(element);
        });

        if (range(hour, 13, 15)) {
            resultados.hour = "01:00 PM"            
            resultados.a = loteria[0].num;    
            resultados.b = loteria[1].num;    
            resultados.zod = {num: loteria[6].num, sg:loteria[6].sg};    
        }
        if (range(hour, 16, 21)) {
            resultados.hour = "04:00 PM"
            resultados.a = loteria[2].num;    
            resultados.b = loteria[3].num;    
            resultados.zod = {num: loteria[7].num, sg:loteria[7].sg};  
        }
        if (range(hour, 22, 0)) {
            resultados.hour = "10:00 PM"
            resultados.a = loteria[4].num;    
            resultados.b = loteria[5].num;    
            resultados.zod = {num: loteria[8].num, sg:loteria[8].sg}; 
        }
    });
    console.log(resultados);
    return resultados;
};

//FILTRAR NUMEROS TRIPLE GANA Y SUPER GANA ZOD
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
        const loterias = {
            supergana:[],
            triplegana:[],
        }
        data.forEach((element) => {
            if(element.pro=="SuperGana_Sig") loterias.supergana.push(element);
            if(element.pro=="TripleGana_Sig") loterias.triplegana.push(element);
        });

        if (range(hour, 13, 15)) {
            resultados.hour = "01:00 PM"
            resultados.supergana = loterias.supergana[0];    
            resultados.triplegana = loterias.triplegana[0];    
        }
        if (range(hour, 16, 21)) {
            resultados.hour = "04:00 PM"
            resultados.supergana = loterias.supergana[1];    
            resultados.triplegana = loterias.triplegana[1];    
        }
        if (range(hour, 22, 0)) {
            resultados.hour = "10:00 PM"
            resultados.supergana = loterias.supergana[2];    
            resultados.triplegana = loterias.triplegana[2];   
        }
    });
    return resultados;
};

//FILTRAR RESULTADOS DE ANIMIALITOS, CONDORGANA, TROPIGANA, FRUITAGANA, TRINAPA
const getResultadosAnimalitosLoteria = async () => {
    const resultados = {
       tropigana: [],
       fruitagana:[],
       trinapa:[],
       condorgana:[]
    };
    await axios.get(url, { headers }).then(({ data }) => {
        data.forEach((element,index )=> {
            if(element.pro=="TropiGana") resultados.tropigana.push(element);
            if(element.pro=="FruitaGana") resultados.fruitagana.push(element);
            if(element.pro=="TriNapa") resultados.trinapa.push(element);
            if(element.pro=="CondorGana") resultados.condorgana.push(element);
        });
    });
    return resultados;
};


module.exports = { getPiramidNumbers, getTripleTachiraZod, getTripleGanaSuperGanaZod, getResultadosAnimalitosLoteria };
