const express = require("express");
const path = require('path');
const { createCanvas, loadImage, registerFont  } = require("canvas");
const {getPiramidNumbers,getFullDate} = require("./helpers/getPiramidNumbers")

const app = express();
registerFont(path.join(__dirname,'assets','fonts','MontHeavy.otf'), { family: 'Mont' });

const port = process.env.PORT || 3000;

const range = (n, a, b) => {
    return n >= a && n <= b;
};

app.get("/descargar-imagen", (req, res) => {
    const canvas = createCanvas(1080, 1920);
    const ctx = canvas.getContext("2d");
    const results = getPiramidNumbers();

    loadImage(path.join(__dirname,'assets','images','piramide.jpg')).then((image) => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        ctx.font = "70px Mont";
        ctx.fillStyle = '#0036a3'; 
        for (let i = 0; i < results.length; i++) {
            if (i<8) {
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
            if (i==35) {
              ctx.fillText(results[i], i * 121 - 3715, 1380);
          }
        }

        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', `attachment; filename="piramide-${getFullDate()}.png"`);

        canvas.createPNGStream().pipe(res);

        
    });
});
 
app.listen(port, () => {
    console.log("Servidor escuchando en el puerto "+port);
});
