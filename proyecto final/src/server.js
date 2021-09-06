const express = require("express");
const { Router } = express;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("./src/files"));

// Storage

let productos = [];

let id = 0;

// Router

const routerProducto = new Router();
const routerCarrito = new Router();

// Endpoints

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

routerProducto.get("/", (req, res) => {
  try {
    if (productos.length === 0) {
      throw new EmptyArrayException();
    }
    res.status(200).send(productos);
  } catch (error) {
    res.status(400).json({ error: "No existen productos en la base." });
  }
});

routerProducto.get("/:id", (req, res) => {
  const { id } = req.params;
  try {
    if (productos.length < id) {
      throw new WrongIndexException();
    }
    res.status(200).send(productos[id - 1]);
  } catch (error) {
    res.status(400).json({ error: "Producto no encontrado" });
  }
});

routerProducto.post("/", (req, res) => {

  const { title, price, thumbnail } = req.body;

  id++;

  const producto = {
    title: title,
    price: parseInt(price),
    thumbnail: thumbnail,
  };

  productos.push({
    id,
    producto
  })

  res.json({id, producto});
});

routerProducto.delete("/:id", (req, res) => {
  const { id } = req.params;
  try {
    if (productos.length < id) {
      throw new WrongIndexException();
    }
    const index = parseInt(id) - 1;
    const eliminado = productos[index];
    productos.splice(index, 1);

    res.status(200).json({ eliminado: eliminado });
  } catch (error) {
    res.status(400).json({ error: "Producto no encontrado" });
  }
});

routerProducto.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, price, thumbnail } = req.body;

  const modificado = {
    title: title,
    price: parseInt(price),
    thumbnail: thumbnail,
  };
  
  try {
    if (productos.length < id) {
      throw new WrongIndexException();
    }
    const index = parseInt(id) - 1;
    productos[index] = modificado

    res.status(200).json({ modificado: modificado });
  } catch (error) {
    res.status(400).json({ error: "Producto no encontrado" });
  }
});

app.use("/api/productos", routerProducto);
app.use("/api/carrito", routerProducto);

const PORT = process.env.port || 8080;

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

