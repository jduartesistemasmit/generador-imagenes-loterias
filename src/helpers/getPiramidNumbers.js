const getFullDate = () => {
    const date = new Date().toLocaleString("es-VE", {
        timeZone: "America/Caracas",
        day: "numeric",
        month: "numeric",
        year: "numeric",
    });
    const dateSplitted = date.split("/");
    const year = dateSplitted[2];
    const month = dateSplitted[1].padStart(2, "0");
    const day = dateSplitted[0].padStart(2, "0");
    return `${day}${month}${year}`;
};

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

module.exports = {getPiramidNumbers, getFullDate};