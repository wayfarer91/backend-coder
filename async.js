/* -------------------------------------------------------------------------- */
/*                               tarea 2 - crud                               */
/* -------------------------------------------------------------------------- */

// importamos la libreria

const fs = require("fs");

// definimos la clase

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
    this.id = 0;
    this.data = [];
  }

  async getAll() {
    try {
      const objs = await fs.promises.readFile(this.archivo, "utf-8");
      return JSON.parse(objs)     
    } catch (err) {
      return []
    }
  }

  async save(producto) {
    await this.getAll();
    const newObj = { ...producto, id: this.id++ }
    this.data.push(newObj)
    
    try {
      await fs.promises.writeFile(this.archivo, JSON.stringify(this.data));
    } catch (err) {
      console.log("Error de escritura", err);
    }
  }

  async getById(id) {
    const objs = await this.getAll();
    const buscado = objs.find(o => o.id == id)
    return buscado;
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.archivo, "");
    } catch (err) {
      console.log("Error de escritura", err);
    }
  }
}

const p1 = {
  title: "Escuadra",
  price: 123.45,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
};
const p2 = {
  title: "Calculadora",
  price: 234.56,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
  id: 2,
};
const p3 = {
  title: "Globo Terráqueo",
  price: 345.67,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
  id: 3,
};

async function pruebas() {
  const contenedor = new Contenedor("./archivo.txt");

  console.log("muestro todo");
  let objs = await contenedor.getAll();
  console.log(objs);

  console.log("guardo p1");
  await contenedor.save(p1);

  console.log("guardo p2");
  await contenedor.save(p2);

  console.log("guardo p3");
  await contenedor.save(p3);

  console.log("muestro todo");
  let objs2 = await contenedor.getAll();
  console.log(objs2);

  console.log("muestro busqueda");
  let id1 = await contenedor.getById(1)
  console.log(id1)
}

pruebas();