const express = require("express");
const fs = require("fs");

const app = express();

app.get("/productos", (req, res) => {
  try {
    const objs = fs.readFileSync("./archivo.txt", "utf-8");
    return res.status(200).send(objs.toString());
  } catch (err) {
    return res.status(400).send("No se encontraron productos");
  }
});

app.get("/productoRandom", (req, res) => {
  try {
    const objs = fs.readFileSync("./archivo.txt", "utf-8");
    const prods = JSON.parse(objs);
    const item = prods[Math.floor(Math.random() * prods.length)];
    return res.status(200).send(item);
  } catch (err) {
    return res.status(400).send("No se encontraron productos");
  }
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
