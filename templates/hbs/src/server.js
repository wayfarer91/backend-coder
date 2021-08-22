const express = require("express");
const { Router } = express;

const app = express();

const handlebars = require('express-handlebars')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// HBS engine

app.engine(
	'hbs',
	handlebars({
		extname: '.hbs',
		defaultLayout: 'index.hbs',
		// eslint-disable-next-line no-undef
		layoutsDir: __dirname + '/views/layouts',
		// eslint-disable-next-line no-undef
		partialsDir: __dirname + '/views/partials',
	}),
)

app.use(express.static('public'))

app.set('views', './src/views')
app.set('view engine', 'hbs')

// Storage

let productos = [];

let id = 0;

// Router

const routerProducto = new Router();

// Endpoints

app.get('/', (req, res) => {
	res.render('index', {
		productos,
		exist: false,
	})
})


routerProducto.get('/', (req, res) => {
	res.render('productos', {
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

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

