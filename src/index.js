const express = require("express");
const path = require("path");
const { createCanvas, loadImage, registerFont } = require("canvas");
const { getPiramidNumbers, getTripleTachiraZod, getTripleGanaSuperGanaZod, getResultadosAnimalitosLoteria} = require("./helpers/getResultados");
const { getFullDate, range } = require("./helpers/helpers");

const app = express();
registerFont(path.join(__dirname, "assets", "fonts", "MontHeavy.otf"), {family: "Mont",});

const port = process.env.PORT || 3000;
const url = "https://generador-imagenes-loterias.onrender.com/";
const urls = {
    rutas: {
        Piramide_Triple_Tachira: url + "triple-tachira-piramide",
        Zodiacal_Triple_Tachira: url + "triple-tachira-zod",
        SuperGana_TripleGana_Zodiacal: url + "triplegana-supergana-zod",
        Animalitos_Loteria: url + "animalitos-loteria",
    },
};

app.get("/", (req, res) => {
    res.json(urls);
});

app.get("/triple-tachira-piramide", (req, res) => {
    const canvas = createCanvas(1080, 1920);
    const ctx = canvas.getContext("2d");
    const results = getPiramidNumbers();

    loadImage(
        path.join(__dirname, "assets", "images", "triple-tachira-piramide.jpg")
    ).then((image) => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        ctx.font = "70px Mont";
        ctx.fillStyle = "#0036a3";
        for (let i = 0; i < results.length; i++) {
            if (i < 8) {
                ctx.fillText(results[i], 90 + i * 121, 551);
            }
            if (range(i, 8, 14)) {
                ctx.fillText(results[i], i * 121 - 810, 672);
            }
            if (range(i, 15, 20)) {
                ctx.fillText(results[i], i * 121 - 1600, 790);
            }
            if (range(i, 21, 25)) {
                ctx.fillText(results[i], i * 121 - 2260, 910);
            }
            if (range(i, 26, 29)) {
                ctx.fillText(results[i], i * 121 - 2810, 1030);
            }
            if (range(i, 30, 32)) {
                ctx.fillText(results[i], i * 121 - 3230, 1150);
            }
            if (range(i, 33, 34)) {
                ctx.fillText(results[i], i * 121 - 3535, 1262);
            }
            if (i == 35) {
                ctx.fillText(results[i], i * 121 - 3715, 1380);
            }
        }

        res.setHeader("Content-Type", "image/png");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="piramide-${getFullDate()}.png"`
        );

        canvas.createPNGStream().pipe(res);
    });
});

app.get("/triple-tachira-zod", async (req, res) => {
    const canvas = createCanvas(755, 1334);
    const ctx = canvas.getContext("2d");
    const date = new Date()
        .toLocaleDateString("es-VE", {
            timeZone: "America/Caracas",
            day: "numeric",
            month: "short",
        })
        .toUpperCase()
        .split(" ");

    getTripleTachiraZod().then((resultados) => {
        loadImage(
            path.join(__dirname, "assets", "images", "triple-tachira-zod.jpg")
        ).then((image) => {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            /* FECHA */
            ctx.fillStyle = "#fff";
            ctx.font = "50px Mont";
            ctx.fillText(date[1], 80, 130);
            ctx.font = "70px Mont";
            ctx.fillText(date[0], 85, 75);

            /* HORA */
            const x = 245; // Coordenada x del cuadrado
            const y = 365; // Coordenada y del cuadrado
            const width = 210; // Ancho del cuadrado
            const height = 60; // Alto del cuadrado
            const borderRadius = 20; // Radio de los bordes redondeados
            ctx.beginPath();
            ctx.moveTo(x + borderRadius, y);
            ctx.lineTo(x + width - borderRadius, y);
            ctx.arc(
                x + width - borderRadius,
                y + borderRadius,
                borderRadius,
                (Math.PI * 3) / 2,
                0
            );
            ctx.lineTo(x + width, y + height - borderRadius);
            ctx.arc(
                x + width - borderRadius,
                y + height - borderRadius,
                borderRadius,
                0,
                Math.PI / 2
            );
            ctx.lineTo(x + borderRadius, y + height);
            ctx.arc(
                x + borderRadius,
                y + height - borderRadius,
                borderRadius,
                Math.PI / 2,
                Math.PI
            );
            ctx.lineTo(x, y + borderRadius);
            ctx.arc(
                x + borderRadius,
                y + borderRadius,
                borderRadius,
                Math.PI,
                (Math.PI * 3) / 2
            );
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = "#000";
            ctx.font = "40px Mont";

            ctx.stroke();
            ctx.fillText(resultados.hour, 255, 410);

            /* RESULTADOS */
            ctx.font = "70px Mont";
            ctx.fillStyle = "#0036a3";
            ctx.fillText(resultados.a, 434, 560);
            ctx.fillText(resultados.b, 434, 744);
            ctx.fillText(resultados.zod.num, 434, 927);
            ctx.font = "50px Mont";
            ctx.fillText(resultados.zod.sg, 445, 978);
            
            // res.setHeader('Content-Type', 'image/png');
            // res.send(canvas.toBuffer());

            res.setHeader("Content-Type", "image/png");
            res.setHeader(
                "Content-Disposition",
                `attachment; filename="tripletachirazod-${getFullDate()}.png"`
            );

            canvas.createPNGStream().pipe(res);

        });
    });
});

app.get("/triplegana-supergana-zod", (req, res) => {
    const canvas = createCanvas(1080, 1920);
    const ctx = canvas.getContext("2d");
    const date = new Date()
        .toLocaleDateString("es-VE", {
            timeZone: "America/Caracas",
            day: "numeric",
            month: "short",
        })
        .toUpperCase()
        .split(" ");

    getTripleGanaSuperGanaZod().then((resultados) => {
        loadImage(
            path.join(
                __dirname,
                "assets",
                "images",
                "triplegana-supergana-zod.jpg"
            )
        ).then((image) => {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            /* FECHA */
            ctx.fillStyle = "#000";
            ctx.font = "60px Mont";
            ctx.fillText(date[1], 828, 175);
            ctx.font = "100px Mont";
            ctx.fillText(date[0], 828, 115);

            function drawRoundedRect(x, y, width, height, borderRadius) {
                ctx.beginPath();
                ctx.moveTo(x + borderRadius, y);
                ctx.lineTo(x + width - borderRadius, y);
                ctx.arc(
                    x + width - borderRadius,
                    y + borderRadius,
                    borderRadius,
                    (Math.PI * 3) / 2,
                    0
                );
                ctx.lineTo(x + width, y + height - borderRadius);
                ctx.arc(
                    x + width - borderRadius,
                    y + height - borderRadius,
                    borderRadius,
                    0,
                    Math.PI / 2
                );
                ctx.lineTo(x + borderRadius, y + height);
                ctx.arc(
                    x + borderRadius,
                    y + height - borderRadius,
                    borderRadius,
                    Math.PI / 2,
                    Math.PI
                );
                ctx.lineTo(x, y + borderRadius);
                ctx.arc(
                    x + borderRadius,
                    y + borderRadius,
                    borderRadius,
                    Math.PI,
                    (Math.PI * 3) / 2
                );
                ctx.closePath();
                ctx.fillStyle = "#fff";
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = "#000";
            }

            ctx.font = "60px Mont";
            drawRoundedRect(120, 745, 310, 100, 20, "white", "black", "black");
            ctx.fillText(resultados.hour, 132, 817);
            drawRoundedRect(120, 1345, 310, 100, 20, "white", "black", "black");
            ctx.fillText(resultados.hour, 132, 1417);

            ctx.font = "70px Mont";
            ctx.fillText(
                `${resultados.supergana.num} ${resultados.supergana.sg}`,
                575,
                828
            );
            ctx.fillText(
                `${resultados.triplegana.num} ${resultados.triplegana.sg}`,
                600,
                1428
            );

            // res.setHeader("Content-Type", "image/png");
            // res.send(canvas.toBuffer());

            res.setHeader("Content-Type", "image/png");
            res.setHeader(
                "Content-Disposition",
                `attachment; filename="triplegana-supergana-zod-${getFullDate()}.png"`
            );

            canvas.createPNGStream().pipe(res);
        });
    });
});

app.get("/animalitos-loteria", (req, res) => {
    const canvas = createCanvas(1080, 1920);
    const ctx = canvas.getContext("2d");
    const date = new Date().toLocaleDateString("es-VE", {
        timeZone: "America/Caracas",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    getResultadosAnimalitosLoteria().then((resultados) => {
        loadImage(
            path.join(__dirname, "assets", "images", "animalitos.jpg")
        ).then((image) => {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            ctx.font = "50px Mont";
            ctx.textAlign = "center";
           ctx.textBaseline = "middle";
            ctx.fillText(date, 735, 165);
            
            const drawResults=(top,left, text)=>{
                let aux = 0;
                for (let i = 0; i < 10; i++) {
                    if (i == 5) {
                        aux = 0;
                    }
                    let x = aux == 0 ? left : left + 5 + 144 * aux;
                    let y = (i<5)?top:top+113;
                    ctx.font = "35px Mont";
                    ctx.fillText(text[i].num, x, y);
                    y += 28;
                    ctx.font = `${text[i].sg.length>8? "18px":"23px"} Mont`;
                    ctx.fillText(text[i].sg, x, y);
                    aux++;
                }
            }
            drawResults(509,384,resultados.tropigana)
            drawResults(779,384,resultados.fruitagana)
            drawResults(1064,384,resultados.trinapa)
            drawResults(1325,384,resultados.condorgana)

            // res.setHeader("Content-Type", "image/png");
            // res.send(canvas.toBuffer());

            res.setHeader('Content-Type', 'image/png');
            res.setHeader('Content-Disposition', `attachment; filename="animalitos-lot-${getFullDate()}.png"`);
            canvas.createPNGStream().pipe(res);
        });
    });
});

app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port);
});
