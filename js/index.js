//Productos

function Producto(id, nombre, imagen, valor, unidades, personalizada) {
  this.id = id;
  this.nombre = nombre;
  this.imagen = imagen;
  this.valor = valor;
  this.unidades = unidades;
  this.personalizada = personalizada;
}

// lista de productos

const PRODUCTOS = [
  new Producto(1, "Torta", "multimedia/prod_1.jpg", 10000, 1, false),
  new Producto(2, "Galletitas", "multimedia/prod_2.jpg", 1500, 1, false),
  new Producto(3, "Cupcakes", "multimedia/prod_3.jpg", 2500, 1, false),
  new Producto(4, "Alfajores", "multimedia/prod_4.jpg", 1200, 1, false)
];

let contenedorProductos = document.getElementById("contenedorProductos");

// Crear  HTML => CARD
let cardHtml = PRODUCTOS.map(function (PRODUCTOS) {

  return `
      <div class="card">
        <h3>${PRODUCTOS.nombre}</h3>
        <img src="${PRODUCTOS.imagen}" alt="${PRODUCTOS.nombre}">
        <p>Valor: $${PRODUCTOS.valor}</p>
        <p>Unidades: ${PRODUCTOS.unidades}</p>
        <button class="botonAgregar" data-id="${PRODUCTOS.id}">Agregar</button>
      </div>
    `;
    
});

contenedorProductos.innerHTML = cardHtml.join('');

//Carrito:

const CARRITO = [];

let contenedorCarrito = document.getElementById("contenedorCarrito");

function totalCarrito() {

  let total = 0;
  CARRITO.forEach(producto => {
    total += producto.valor * producto.unidades;
  });

  return total;

}

function totalHtml() {
  const TOTAL_HTML = document.getElementById("totalHtml");
  TOTAL_HTML.textContent = `$${totalCarrito()}`;
}

function agregarAlCarrito(PRODUCTOS) {

  const INDICE = CARRITO.findIndex(item => item.id === PRODUCTOS.id);

  INDICE !== -1 ? CARRITO[INDICE].unidades += 1 : CARRITO.push(PRODUCTOS);

  totalCarrito();

  // Crear  HTML => CARD
  let cardCarritoHtml = CARRITO.map(function (producto) {

    return `
      <div class="card">
        <h3>${producto.nombre}</h3>
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <p>Valor: $${producto.valor * producto.unidades}</p>
        <p>Unidades: ${producto.unidades}</p>
        <button class="botonQuitar" data-id="${producto.id}">Quitar</button>
      </div>
    `;

  });
  contenedorCarrito.innerHTML = cardCarritoHtml.join('');

  totalHtml()
}

let botonAgregar = document.querySelectorAll(".botonAgregar");

botonAgregar.forEach(function (boton) {
  boton.addEventListener('click', function () {

    let idProducto = parseInt(boton.getAttribute('data-id'));
    let prod = PRODUCTOS.find(function (producto) {
      return producto.id === idProducto;
    });

    if (prod) {
      agregarAlCarrito(prod);
    }

  });
});

//Borrar 

function vaciarCarrito() {

  CARRITO.length = 0;
  contenedorCarrito.innerHTML = '';
  totalHtml();

}

const VACIAR_CARRITO = document.getElementById("borrar");
VACIAR_CARRITO.addEventListener('click', vaciarCarrito);