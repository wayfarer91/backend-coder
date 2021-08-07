
/* -------------------------------------------------------------------------- */
/*                              tarea 1 - clases                              */
/* -------------------------------------------------------------------------- */

// definimos la clase

class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }

  addMascota(mascota) {
    return this.mascotas.push(mascota);
  }

  countMascotas() {
    return this.mascotas.length;
  }

  addBook(libro) {
    return this.libros.push(libro);
  }

  getBookNames() {
    return Object.keys(this.libros).map(key => this.libros[key]['nombre'])
  }
  
}

// creamos el objeto

user1 = new Usuario("Nicolás", "Rodriguez", [{nombre:"Steve Job", autor: "Isaac walterson"}], ["Gato"]);

// agregamos un mascota

user1.addMascota('Perro');

// contamos las mascotas

console.log(user1.countMascotas())

// agregamos un libro y su autor

user1.addBook({nombre:'El señor de las moscas',autor:'William Golding'});

// imprimimos solo los libros

console.log(user1.getBookNames())

// imprimimos el nombre completo

console.log(user1.getFullName())