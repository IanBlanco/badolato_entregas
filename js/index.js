// Mostrar los productos en la página
function mostrarProductos(productos) {
    let contenedorProductos = document.getElementById("contenedorProductos");
    let cardHtml = productos.map(function (producto) {
        return `
          <div class="card">
              <h3>${producto.nombre}</h3>
              <img src="${producto.imagen}" alt="${producto.nombre}">
              <p>Valor: $${producto.valor}</p>
              <p>Unidades: ${producto.unidades}</p>
              <button class="botonAgregar" data-id="${producto.id}">Agregar</button>
          </div>
      `;
    });

    contenedorProductos.innerHTML = cardHtml.join('');

    let botonesAgregar = document.querySelectorAll(".botonAgregar");
    botonesAgregar.forEach(function (boton) {
        boton.addEventListener('click', function () {
            let idProducto = parseInt(boton.getAttribute('data-id'));
            agregarAlCarrito(idProducto, productos);
        });
    });
}

// Cargar los productos
function cargarProductos() {
    const prod = new XMLHttpRequest();
    prod.open('GET', 'js/productos.json', true);
    prod.onload = function () {
        if (prod.status === 200) {
            const productos = JSON.parse(prod.responseText);
            mostrarProductos(productos);
        }
    };
    prod.send();
}

window.addEventListener('load', cargarProductos);

let CARRITO = [];
let contenedorCarrito = document.getElementById("contenedorCarrito");

// Agregar un producto al carrito
function agregarAlCarrito(idProducto, productos) {
    const prod = productos.find(producto => producto.id === idProducto);
    if (prod) {
        const INDICE = CARRITO.findIndex(item => item.id === prod.id);
        INDICE !== -1 ? CARRITO[INDICE].unidades += 1 : CARRITO.push({
            ...prod,
            unidades: 1
        });
    }
    mostrarCarrito();
    guardarCarritoEnStorage();
}

// Mostrar el carrito
function mostrarCarrito() {
    let cardCarritoHtml = CARRITO.map(function (producto) {
        return `
          <div class="card " id="card-carrito">
              <p>${producto.unidades}</p>
              <h3>${producto.nombre}</h3>
              <img src="${producto.imagen}" alt="${producto.nombre}">
              <p>$${producto.valor * producto.unidades}</p>
              
              <button class="botonQuitar" data-id="${producto.id}">Quitar</button>
          </div>
      `;
    });

    contenedorCarrito.innerHTML = cardCarritoHtml.join('');

    // Botones "Quitar"
    let botonesQuitar = document.querySelectorAll(".botonQuitar");
    botonesQuitar.forEach(function (boton) {
        boton.addEventListener('click', function () {
            let idProducto = parseInt(boton.getAttribute('data-id'));
            quitarDelCarrito(idProducto);
        });
    });

    totalHtml();
}

// Guardar en localStorage
function guardarCarritoEnStorage() {
    localStorage.setItem('carrito', JSON.stringify(CARRITO));
}

// Cargar el carrito desde localStorage
function cargarCarritoDesdeStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        CARRITO = JSON.parse(carritoGuardado);
        mostrarCarrito();
    }
}

// Cargar el carrito al cargar la página
window.addEventListener('load', cargarCarritoDesdeStorage);

// Calcular el total del carrito y mostrarlo
function totalHtml() {
    let total = 0;
    CARRITO.forEach(producto => {
        total += producto.valor * producto.unidades;
    });
    const TOTAL_HTML = document.getElementById("totalHtml");
    TOTAL_HTML.textContent = `$${total}`;
}

// Quitar un producto del carrito
function quitarDelCarrito(idProducto) {
    const indice = CARRITO.findIndex(producto => producto.id === idProducto);
    if (indice !== -1) {
        if (CARRITO[indice].unidades > 1) {
            CARRITO[indice].unidades--;
        } else {
            CARRITO.splice(indice, 1);
        }
        mostrarCarrito();
        guardarCarritoEnStorage();
    }
}

// Vaciar el carrito
function vaciarCarrito() {
    CARRITO.length = 0;
    contenedorCarrito.innerHTML = '';
    guardarCarritoEnStorage();
    totalHtml();

    Swal.fire({
        title: 'Carrito vacío!',
        text: 'Has eliminado todos los elementos del carrito.',
        icon: 'warning',
        confirmButtonText: 'OK'
    });
}

// Evento para vaciar el carrito
const VACIAR_CARRITO = document.getElementById("borrar");
VACIAR_CARRITO.addEventListener('click', vaciarCarrito);


//Enviar por whatsaap
document.getElementById("generarMensaje").addEventListener("click", function () {
    const nombre = document.getElementById("nombre").value.trim();
    const fecha = document.getElementById("fecha").value;
    const numeroDestino = 541168378190;

    // Validación de campos
    if (!nombre || !fecha) {
        alert("Por favor, completa tu nombre y la fecha de entrega.");
        return;
    }

    // Validación de la fecha (que no sea pasada)
    const hoy = new Date().toISOString().split("T")[0];
    if (fecha < hoy) {
        Swal.fire({
            title: '¡Fecha incorrecta!',
            text: 'La fecha ingresada es anterior al dia de hoy.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return;
    }

    // Construcción del mensaje
    const leyenda = `🌟 Hola, soy *${nombre}*. Quisiera realizar el siguiente pedido para la fecha *${fecha}*:`;
    const detalleCarrito = CARRITO.map(producto =>
        `- ${producto.unidades}x *${producto.nombre}* - $${producto.valor * producto.unidades}`).join("\n");
    const total = CARRITO.reduce((acc, producto) => acc + producto.valor * producto.unidades, 0);
    const mensajeFinal = `${leyenda}\n\n${detalleCarrito}\n\n🔢 *Total: $${total}*`;

    console.log("Mensaje generado:", mensajeFinal);

    // Enviar por WhatsApp
    const mensajeWhatsApp = encodeURIComponent(mensajeFinal);
    const urlWhatsApp = `https://wa.me/${numeroDestino}?text=${mensajeWhatsApp}`;
    window.open(urlWhatsApp, "_blank");
});



/*
document.getElementById("generarMensaje").addEventListener("click", function () {
    const nombre = document.getElementById("nombre").value.trim();
    const fecha = document.getElementById("fecha").value;
    let numero_destino = 541168378190;

    if (!nombre || !fecha) {
        alert("Por favor, completa tu nombre y la fecha de entrega.");
        return;
    }

    const leyenda = `Hola, soy ${nombre}. Quisiera realizar el siguiente pedido para la fecha ${fecha}:`;
    const detalleCarrito = CARRITO.map(producto => 
        `${producto.unidades}x ${producto.nombre} - $${producto.valor * producto.unidades}`).join('\n');
    const total = CARRITO.reduce((acc, producto) => acc + producto.valor * producto.unidades, 0);

    const mensajeFinal = `${leyenda}\n\n${detalleCarrito}\n\nTotal: $${total}`;
    console.log("Mensaje generado:", mensajeFinal);

    // Enviar por WhatsApp
    const mensajeWhatsApp = `${leyenda}%0A%0A${CARRITO.map(producto => 
        `${producto.unidades}x ${producto.nombre} - $${producto.valor * producto.unidades}`).join('%0A')}` +
        `%0A%0ATotal: $${total}`;
    const urlWhatsApp = `https://wa.me/${numero_destino}?text=${encodeURIComponent(mensajeWhatsApp)}`;
    window.open(urlWhatsApp, "_blank");
});


/*
const leyenda = "Hola, te comparto el detalle de mi pedido:";


function enviarCarritoPorWhatsApp() {
    const numeroTelefono = "541168378190"; // Cambiá por el número de destino con código de país
    const mensaje = CARRITO.map(producto => 
        `${producto.unidades}x ${producto.nombre} - $${producto.valor * producto.unidades}`).join('%0A');
    const total = CARRITO.reduce((acc, producto) => acc + producto.valor * producto.unidades, 0);
    const enlace = `https://wa.me/${541168378190}?text=${leyenda}%0A${mensaje}%0ATotal: $${total}`;

    window.open(enlace, '_blank');
}

document.getElementById('enviarWhatsApp').addEventListener('click', enviarCarritoPorWhatsApp);
*/