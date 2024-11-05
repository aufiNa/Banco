import { Usuario } from "./Usuarios.js";
import { Banco } from "./Banco.js";

// Creacion de usuarios
const usuario1 = new Usuario(
  "usuario1",
  "Juan",
  "Perez",
  "juanperez@gmail.com",
  "1234",
  new Banco(1000)
);
const usuario2 = new Usuario(
  "usuario2",
  "Pedro",
  "Perez",
  "pedro@gmail.com",
  "2345",
  new Banco(2000)
);
const usuario3 = new Usuario(
  "usuario3",
  "Carlos",
  "Perez",
  "carlos@gmail.com",
  "3456",
  new Banco(3000)
);

console.log(usuario1.Cuenta);
console.log(usuario2.Cuenta);
console.log(usuario3.Cuenta);
guardarUsuarioEnLocalStorage("cuentas " + (Banco.acounts - 3), usuario1.Cuenta);
guardarUsuarioEnLocalStorage("cuentas " + (Banco.acounts - 2), usuario2.Cuenta);
guardarUsuarioEnLocalStorage("cuentas " + (Banco.acounts - 1), usuario3.Cuenta);
guardarUsuarioEnLocalStorage("Cantidadcuentas", (Banco.acounts -1));

function guardarUsuarioEnLocalStorage(clave, usuario) {
  const usuarioJSON = JSON.stringify(usuario);
  localStorage.setItem(clave, usuarioJSON); // Usa su nombre de usuario como clave
}

function recuperarUsuarioDesdeLocalStorage(nombreUsuario) {
  const usuarioJSON = localStorage.getItem(nombreUsuario);

  if (usuarioJSON) {
    const datos = JSON.parse(usuarioJSON);

    // Verificamos si `cuentas` existe y es un arreglo antes de aplicar `.map`
    const cuentas = Array.isArray(datos.cuentas)
      ? datos.cuentas.map(
          (cuentaData) => new Banco(cuentaData.idcuenta, cuentaData.saldo)
        )
      : []; // Si `cuentas` no existe, lo inicializamos como un arreglo vacío

    return new Usuario(
      datos.Usuario,
      datos.nombre,
      datos.apellido,
      datos.email,
      datos.contrasenia,
      cuentas
    );
  }

  return null; // Retorna null si no se encuentra el usuario
}

// Agregar usuarios a la lista de usuarios
export let Usuarioss = [usuario1, usuario2, usuario3];

//traer  elementos del html
const usuario = document.getElementById("usuario");
const contraseña = document.getElementById("contraseña");
const InicioSesion = document.getElementById("InicioSesion");
const contenedorLogin = document.querySelector(".contenedorLogin");
const ContenedorMenuPrincipal = document.querySelector(
  ".ContenedorMenuPrincipal"
);
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const nombre1 = document.getElementById("nombre1");
const apellido1 = document.getElementById("apellido1");
const Transferencia = document.getElementById("Transferencia");
const CerrarSesion = document.getElementById("CerrarSesion");
const agregarCuenta = document.getElementById("agregarCuenta");
const ContenedorMenuTransferencias = document.querySelector(
  ".ContenedorMenuTransferencias"
);
const btntransferencia = document.getElementById("enviarTransferencia");
const cancelar = document.getElementById("cancelar");
let userfound = "";

// Funciones del boton inicio de sesion
InicioSesion.addEventListener("click", () => {
  VerificarUsuario();
  cargarSelectCuentas();
});
//funcuion para verificar si el usuario existe y si los datos son correctos
function VerificarUsuario() {
  userfound = Usuarioss.find(
    (elemento) =>
      elemento.Usuario === usuario.value &&
      elemento.contrasenia === contraseña.value
  );
  console.log("usuario encontrado", userfound);
  if (userfound) {
    guardarUsuarioEnLocalStorage("usuario", userfound);
    console.log(
      "Usuario correcto",
      recuperarUsuarioDesdeLocalStorage("usuario", userfound).Usuario
    );
    alert("Bienvenido a Banco Programadores " + userfound.nombre);
    contenedorLogin.classList.add("oculto");
    ContenedorMenuPrincipal.classList.remove("oculto");
    nombre.value = userfound.nombre;
    apellido.value = userfound.apellido;
  } else {
    alert("Nombre de usuario o contraseña incorrectos");
  }
}
// Cambio de ventana de login a transferencias a travez de su boton
 Transferencia.addEventListener("click", () => {
  ContenedorMenuPrincipal.classList.add("oculto");
  ContenedorMenuTransferencias.classList.remove("oculto");
  cargarrSelectCuentas();
  CargaCuentasTotales();

}); 
// Cierre de sesion a travez de su boton
CerrarSesion.addEventListener("click", () => {
  contenedorLogin.classList.remove("oculto");
  ContenedorMenuPrincipal.classList.add("oculto");
});
// Boton agregar cuenta llama a su funcion
agregarCuenta.addEventListener("click", () => {
  AgregarCuenta();
});

// Funcion para agregar cuentas
function AgregarCuenta() {
  const usuarioEncontrado = Usuarioss.find(
    (u) => u.Usuario === userfound.Usuario
  );

  if (usuarioEncontrado) {
    const saldo = prompt("Ingrese el saldo a agregar");
    const nuevaCuenta = new Banco(saldo);
    usuarioEncontrado.AgregarCuenta(nuevaCuenta);
    alert("Cuenta agregada");
    console.log(usuarioEncontrado.Cuenta);
    guardarUsuarioEnLocalStorage("cuentas " + (Banco.acounts - 1), nuevaCuenta);
    guardarUsuarioEnLocalStorage("usuario", usuarioEncontrado);
    guardarUsuarioEnLocalStorage("Cantidadcuentas", (Banco.acounts -1));
    cargarSelectCuentas();
  } else {
    alert("Error: No se encontró el usuario en la sesión");
  }
}

// Funcion para mostrar los cuentas en el selector
function cargarSelectCuentas() {
  const usuarioEncontrado = Usuarioss.find(
    (u) => u.Usuario === userfound.Usuario
  );
  const selectCuentas = document.createElement("select");
  selectCuentas.id = "selectCuentas";
  usuarioEncontrado.Cuenta.forEach((cuenta) => {
    const option = document.createElement("option");
    option.value = cuenta.cuenta;
    option.textContent = `Cuenta: ${cuenta.cuenta}  Saldo: $${cuenta.saldo} ${userfound.nombre} ${userfound.apellido}`;
    selectCuentas.appendChild(option);
  });

  const contenedorSelect = document.getElementById("contenedorSelect");
  contenedorSelect.innerHTML = "";
  contenedorSelect.appendChild(selectCuentas);
}
 function cargarrSelectCuentas() {
  const usuarioEncontrado = Usuarioss.find(
    (u) => u.Usuario === userfound.Usuario
  );
  const selectCuentas = document.createElement("select");
  selectCuentas.id = "selectCuentass";
  usuarioEncontrado.Cuenta.forEach((cuenta) => {
    const option = document.createElement("option");
    option.value = cuenta.cuenta;
    option.textContent = `Cuenta: ${cuenta.cuenta} Saldo: $${cuenta.saldo} ${userfound.nombre} ${userfound.apellido}`;
    selectCuentas.appendChild(option);
  });

  const contenedorSelect = document.getElementById("contenedorSelecct");
  contenedorSelect.innerHTML = "";
  contenedorSelect.appendChild(selectCuentas);
}

function CargaCuentasTotales() {
  const contenedorSelect = document.getElementById("contenedorCuentasTotales");
  contenedorSelect.innerHTML = ""; // Limpia cualquier contenido previo

  // Crear un elemento select
  const userrs = document.createElement("select");
  userrs.id = "selectCuentas1";

  // Recorrer cada usuario y sus cuentas
  Usuarioss.forEach((u) => {
    u.Cuenta.forEach((cuenta) => {
      const option = document.createElement("option");
      option.value = cuenta.idcuenta;
      option.textContent = `Cuenta: ${cuenta.idcuenta}  Saldo: $${cuenta.saldo}  ${u.nombre}  ${u.apellido}`;
      userrs.appendChild(option);
    });
  });

  // Añadir el select al contenedor en el DOM
  contenedorSelect.appendChild(userrs);
}

btntransferencia.addEventListener("click", () => {
  const selectCuentas = document.getElementById("selectCuentass");
  const selectCuentas1 = document.getElementById("selectCuentas1");

  const cantidadTransferencia = document.getElementById(
    "cantidadTransferencia"
  ).value;

  const idcuenta1 = parseInt(selectCuentas.value);
  console.log(idcuenta1);

  const idcuenta2 = parseInt(selectCuentas1.value);
  console.log(idcuenta2);

  let err = "";

  if (
    idcuenta1 != "" &&
    idcuenta2 != "" &&
    cantidadTransferencia != "" &&
    idcuenta1 != idcuenta2
  ) {
    err = "a";
    let origen = "";
    let destino = "";

    for (
      let i = 0;
      i < Usuarioss.length && !(origen != "" && destino != "");
      i++
    ) {
      for (
        let j = 0;
        j < Usuarioss[i].Cuenta.length && !(origen != "" && destino != "");
        j++
      ) {
        let cuenta = Usuarioss[i].Cuenta[j];
        console.log(cuenta);

        if (cuenta.idcuenta === idcuenta1) {
          origen = cuenta;
        }
        if (cuenta.idcuenta === idcuenta2) {
          destino = cuenta;
        }
      }
    }
    origen.saldo = parseInt(origen.saldo) - parseInt(cantidadTransferencia);
    console.log(origen.saldo);

    destino.saldo = parseInt(destino.saldo) + parseInt(cantidadTransferencia);
    console.log(destino.saldo);
    alert("Transferencia exitosa");

    ContenedorMenuPrincipal.classList.remove("oculto");
    ContenedorMenuTransferencias.classList.add("oculto");
    cargarSelectCuentas();
    cargarrSelectCuentas();
    CargaCuentasTotales();
  }
if (idcuenta1 === idcuenta2)  {
  alert("Error: No se puede transferir a su mismo cuenta");
} 
if (cantidadTransferencia === "") {
  alert("Error: Debe ingresar una cantidad");
}

});

cancelar.addEventListener("click", () => {
    ContenedorMenuPrincipal.classList.remove("oculto");
    ContenedorMenuTransferencias.classList.add("oculto");
    cargarSelectCuentas();
    cargarrSelectCuentas();
    CargaCuentasTotales();
});
 