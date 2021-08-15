const express = require("express");
const { Router } = express;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("./src/files"));

// Storage

let productos = [
  {
    title: "Book",
    price: 5,
    thumbnail: "cool.url",
  },
];

// Router

const routerProducto = new Router();

// Endpoints

routerProducto.get("/", (req, res) => {
  res.send({
    productos,
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/files/index.html");
});

routerProducto.get("/", (req, res) => {
  try {
    res.status(200).send(productos);
  } catch (error) {
    res.status(400).json({ error: "No existen productos en la base." });
  }
});

routerProducto.get("/:id", (req, res) => {
  const { id } = req.params;
  try {
    res.status(200).send(productos[id - 1]);
  } catch (error) {
    res.status(400).json({ error: "Producto no encontrado" });
  }
});

routerProducto.post("/", (req, res) => {
  const { title, price, thumbnail } = req.body;
  const producto = {
    title: title,
    price: parseInt(price),
    thumbnail: thumbnail,
  };
  productos = productos.concat(producto);
  res.json(producto);
});

routerProducto.delete("/:id", (req, res) => {
  const { id } = req.params;
  try {
    const index = parseInt(id) - 1;
    const eliminado = productos[index];
    productos = productos.splice(index, 1);

    res.status(200).json({ eliminado: eliminado });
  } catch (error) {
    res.status(400).json({ error: "Producto no encontrado" });
  }
});

app.use("/api/productos", routerProducto);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
