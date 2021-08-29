const express = require("express");
const { Router } = express;

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer, {
  cors: { origin: 'http://localhost:8080' },
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/views'))

// EJS engine

app.set('view engine', 'ejs')

// Storage

let productos = [];

let id = 0;

// Router

const routerProducto = new Router();

// Sockets

io.on('connection', (socket) => {
  console.log('Usuario conectado')
  socket.emit('messageBackend', productos)
  socket.on('messageFront', (data) => {
    productos.push({
      id: id++,
      producto: data,
    })
    io.sockets.emit('messageBackend', productos)
  })

})

// Endpoints

app.get('/', (req, res) => {
  const producto = {
    title: 'Title',
    price: 'Price',
    thumbnail: 'Thumbnail'
  }
  res.render('../src/views/index', {
    producto,
  })
})

routerProducto.get('/', (req, res) => {
  res.render('../src/views/productos', {
    productos,
  })
})

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

  res.redirect('/productos');
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

app.use("/productos", routerProducto);

const PORT = 8080;

httpServer.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
