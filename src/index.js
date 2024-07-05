const express = require("express");
const path = require("path");
const { createCanvas, loadImage, registerFont } = require("canvas");
const API = require("./helpers/getResultados");
const { getFullDate, range, getFormatDate } = require("./helpers/helpers");
const { URL, PORT } = require("./helpers/constants");
const app = express();

registerFont(path.join(__dirname, "assets", "fonts", "MontHeavy.otf"), {
  family: "Mont",
});

app.get("/", (req, res) => {
  res.json({
    rutas: {
      Piramide_Triple_Tachira: URL + "triple-tachira-piramide",
      Zodiacal_Triple_Tachira: URL + "triple-tachira-zod",
      SuperGana_TripleGana_Zodiacal: URL + "triplegana-supergana-zod",
      Animalitos_Loteria: URL + "animalitos-loteria",
    },
  });
});

app.get("/triple-tachira-piramide", (req, res) => {
  const canvas = createCanvas(1080, 1920);
  const ctx = canvas.getContext("2d");
  const results = API.getPiramidNumbers();

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
  const [day, month] = getFormatDate();

  API.getTripleTachiraZod().then((resultados) => {
    loadImage(
      path.join(__dirname, "assets", "images", "triple-tachira-zod.jpg")
    ).then((image) => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      /* FECHA */
      ctx.fillStyle = "#000";
      ctx.font = "50px Mont";
      ctx.fillText(month, 95, 130);
      ctx.font = "70px Mont";
      ctx.fillText(day, 100, 75);

      /* HORA */
      ctx.font = "40px Mont";
      ctx.stroke();
      ctx.fillText(resultados.hour, 280, 412);

      /* RESULTADOS */
      ctx.font = "70px Mont";
      ctx.fillStyle = "#0036a3";
      ctx.fillText(resultados.a, 469, 560);
      ctx.fillText(resultados.b, 469, 744);
      ctx.fillText(resultados.zod.num, 469, 927);
      ctx.font = "50px Mont";
      ctx.fillText(resultados.zod.sg, 480, 978);

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
  const [day, month] = getFormatDate();

  API.getTripleGanaSuperGanaZod().then((resultados) => {
    loadImage(
      path.join(__dirname, "assets", "images", "triplegana-supergana-zod.jpg")
    ).then((image) => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      /* FECHA */
      ctx.fillStyle = "#000";
      ctx.font = "70px Mont";
      ctx.fillText(month, 880, 235);
      ctx.font = "120px Mont";
      ctx.fillText(day, 880, 175);

      /* HORAS */
      ctx.font = "60px Mont";
      ctx.fillText(resultados.hour, 132, 632);
      ctx.fillText(resultados.hour, 146, 1155);

      /* RESULTADOS */
      ctx.font = "70px Mont";
      ctx.fillText(
        `${resultados.supergana.num} ${resultados.supergana.sg}`,
        635,
        634
      );
      ctx.fillText(
        `${resultados.triplegana.num} ${resultados.triplegana.sg}`,
        635,
        1160
      );

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

  API.getResultadosAnimalitosLoteria().then((resultados) => {
    loadImage(path.join(__dirname, "assets", "images", "animalitos.jpg")).then(
      (image) => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        ctx.font = "50px Mont";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(date, 735, 165);

        const drawResults = (top, left, text) => {
          let aux = 0;
          for (let i = 0; i < 10; i++) {
            if (i == 5) {
              aux = 0;
            }
            let x = aux == 0 ? left : left + 5 + 144 * aux;
            let y = i < 5 ? top : top + 113;
            ctx.font = "35px Mont";
            ctx.fillText(text[i].num, x, y);
            y += 28;
            ctx.font = `${text[i].sg.length > 8 ? "18px" : "23px"} Mont`;
            ctx.fillText(text[i].sg, x, y);
            aux++;
          }
        };
        drawResults(509, 384, resultados.tropigana);
        drawResults(779, 384, resultados.fruitagana);
        drawResults(1064, 384, resultados.trinapa);
        drawResults(1325, 384, resultados.condorgana);

        res.setHeader("Content-Type", "image/png");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="animalitos-lot-${getFullDate()}.png"`
        );
        canvas.createPNGStream().pipe(res);
      }
    );
  });
});

app.listen(PORT, () => {
  console.log("Servidor escuchando en el puerto " + PORT);
});
