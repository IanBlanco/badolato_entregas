let userPrev;
let user = () => {
    let userN = prompt("Ingrese su nombre se usuario");

    let passN = prompt(userN + " ingrese su contraseña");
    let passCheck = prompt(userN + " vuelva ingresar su contraseña");

    if (passN != passCheck) {

        do {
            alert("No coinciden vuelva a intentarlo");
            passN = prompt(userN + " ingrese su contraseña nuevamente");
            passCheck = prompt(userN + " vuelva ingresar su contraseña");
        } while (passN != passCheck)
    }

    alert("Las contraseñas coinciden ✔")
    alert("Bienvendo/a " + userN)
    return userPrev = userN;
}


let user_1;

let nuevoUsuario = () => {

    let newUser = prompt("Ingrese Nombre de usuario");
    let newUserPass = prompt("Ingrese su contraseña, la misma deben ser 4 numeros");
    alert("Bienvenido/a! \nSu usuario: " + newUser + "\nSu contraseña: " + newUserPass);
    return user_1 = newUser;
}



let registrado = confirm("Bienvenido/a! estas registado en ''Badolato Dulces''?")

console.log(registrado);

if (registrado) {
    user();
} else {
    nuevoUsuario()
}




const PRODUCTOS = [{
        nombre: "Torta",
        valor: 10000,
        unidades: 1,
        personalizada: false,
    },
    {
        nombre: "Galletitas",
        valor: 6000,
        unidades: 5,
        personalizada: false,
    },
    {
        nombre: "Cupcake",
        valor: 5000,
        unidades: 2,
        personalizada: false,
    },
    {
        nombre: "Alfajores",
        valor: 2000,
        unidades: 3,
        personalizada: false,
    }
];



let mostrarProductos = "";
for (let i = 0; i < PRODUCTOS.length; i++) {
    mostrarProductos += (PRODUCTOS[i].nombre + " " + PRODUCTOS[i].unidades + "u : $" + PRODUCTOS[i].valor + "\n")
};
alert("Menu: \n" + mostrarProductos);


const CARRITO = [];


let agregarProductos = () => {
    let salir;
    while (salir != false) {
        let pedir = parseFloat(prompt("Ingrese el numero correspondiente a la opcion deseada\nBadolato dulces\nCatalogo: \n1) Torta: $10.000\n2) Galletitas x5: $6.000\n3) Cupcake x2: $5000\n4) Alfajores x3: $2.000\n "));
        switch (pedir) {
            case 1:
                CARRITO.push(PRODUCTOS[0])
                break;
            case 2:
                CARRITO.push(PRODUCTOS[1])
                break;
            case 3:
                CARRITO.push(PRODUCTOS[2])
                break;
            case 4:
                CARRITO.push(PRODUCTOS[3])
                break;
            default:
                alert("Opcion incorrecta.");

        }
        salir = confirm("Desea sumar otro producto a su pedido?")
    }
}
agregarProductos();


let estadoCarrito = () => {
    let mostrarCarrito = "";
    let montoCarrito = 0;

    for (let i = 0; i < CARRITO.length; i++) {
        mostrarCarrito += (i + 1 + ") " + CARRITO[i].nombre + " " + CARRITO[i].unidades + "u : $" + CARRITO[i].valor + "\n");
        montoCarrito += CARRITO[i].valor;
    };
    alert("Su compra es\n" + mostrarCarrito + "\n Monto total:" + montoCarrito);
}

estadoCarrito();

let ok_compra = confirm("Confirma el pedido?")

let modificacion = () => {
    let user_mod = parseFloat(prompt("Para agregar otro producto presione => 1\n Para borrar un producto presione => 2"));
    if (user_mod == 1) {
        agregarProductos();

    } else if (user_mod == 2) {
        let borrarProducto = parseFloat(prompt("Que producto desea borrar? Indique su numero."))
        let q = borrarProducto - 1;
        CARRITO.splice(q, 1)
    } else {
        alert("Opcion incorrecta.")
    }
}

while (ok_compra != true) {

    modificacion();
    estadoCarrito();
    ok_compra = confirm("Confirma el pedido?")

}
alert("Gracias volve pronto!")