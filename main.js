import {Usuario} from "./Usuarios.js";
import {Cuentas} from "./Cuentas.js";



// Creacion de usuarios
const usuario1 = new Usuario("usuario1","Juan", "Perez", "juanperez@gmail.com", "1234",new Cuentas(1, 1000) );
const usuario2 = new Usuario("usuario2","Pedro", "Perez", "pedro@gmail.com", "2345", new Cuentas(2, 2000));
const usuario3 = new Usuario("usuario3","Carlos", "Perez", "carlos@gmail.com", "3456",new Cuentas(3, 3000));

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
            ? datos.cuentas.map(cuentaData => new Cuentas(cuentaData.idcuenta, cuentaData.saldo))
            : []; // Si `cuentas` no existe, lo inicializamos como un arreglo vacío

        return new Usuario(datos.Usuario, datos.nombre, datos.apellido, datos.email, datos.contrasenia, cuentas);
    }

    return null; // Retorna null si no se encuentra el usuario
}



// Agregar usuarios a la lista de usuarios
let Usuarioss = [usuario1, usuario2, usuario3];


//traer  elementos del html
const usuario = document.getElementById("usuario");
const contraseña = document.getElementById("contraseña");
const InicioSesion = document.getElementById("InicioSesion");
const contenedorLogin = document.querySelector(".contenedorLogin");
const ContenedorMenuPrincipal = document.querySelector(".ContenedorMenuPrincipal");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const Transferencia = document.getElementById("Transferencia");
const CerrarSesion = document.getElementById("CerrarSesion");
const agregarCuenta = document.getElementById("agregarCuenta");

let userfound = "";

// Funciones del boton inicio de sesion
InicioSesion.addEventListener("click", ()=>{
    VerificarUsuario();
    cargarSelectCuentas();
   
})
//funcuion para verificar si el usuario existe y si los datos son correctos
function VerificarUsuario() {
     userfound = Usuarioss.find(elemento =>
        elemento.Usuario === usuario.value && elemento.contrasenia === contraseña.value        
    );
    console.log("usuario encontrado", userfound);
    if (userfound) {
        guardarUsuarioEnLocalStorage("usuario", userfound);
        console.log("Usuario correcto", recuperarUsuarioDesdeLocalStorage(userfound.nombre));
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
Transferencia.addEventListener("click", ()=>{
    window.location.href = "./Transferencias.html";
})
// Cierre de sesion a travez de su boton
CerrarSesion.addEventListener("click", ()=>{
    contenedorLogin.classList.remove("oculto");
    ContenedorMenuPrincipal.classList.add("oculto");
})
// Boton agregar cuenta llama a su funcion
agregarCuenta.addEventListener("click", () => {
AgregarCuenta ();
});

// Funcion para agregar cuentas
function AgregarCuenta(){

     const usuarioEncontrado = Usuarioss.find(u => u.Usuario === userfound.Usuario);

    if (usuarioEncontrado) {
        const saldo = prompt("Ingrese el saldo a agregar");
        const nuevaCuenta = new Cuentas(Cuentas.acounts + 1, saldo);
        usuarioEncontrado.AgregarCuenta(nuevaCuenta);
        alert("Cuenta agregada");
        console.log(usuarioEncontrado.Cuenta);
        guardarUsuarioEnLocalStorage("cuentas " + (Cuentas.acounts), nuevaCuenta);
         cargarSelectCuentas(); 

    } else {
        alert("Error: No se encontró el usuario en la sesión");
    }
}


// Funcion para mostrar los cuentas en el selector
 function cargarSelectCuentas() {
    const usuarioEncontrado = Usuarioss.find(u => u.Usuario === userfound.Usuario);
        const selectCuentas = document.createElement("select");
        selectCuentas.id = "selectCuentas";
        usuarioEncontrado.Cuenta.forEach(cuenta => {
            const option = document.createElement("option");
            option.value = cuenta.cuenta;  
            option.textContent = `Cuenta: ${cuenta.cuenta} - Saldo:$${cuenta.saldo}`;
            selectCuentas.appendChild(option);
        });

        const contenedorSelect = document.getElementById("contenedorSelect");
        contenedorSelect.innerHTML = ""; 
        contenedorSelect.appendChild(selectCuentas);
    
}

for (let i = -1; i < Cuentas.acounts.length; i++) {
    guardarUsuarioEnLocalStorage("cuentas" + i, userfound.Cuenta[i]);
    console.log(userfound.Cuenta);
}