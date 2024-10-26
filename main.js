import {Usuario} from "./Usuarios.js";
import {Cuentas} from "./Cuentas.js";



// Creacion de usuarios
const usuario1 = new Usuario("usuario1","Juan", "Perez", "juanperez@gmail.com", "1234",new Cuentas(1, 1000) );
const usuario2 = new Usuario("usuario2","Pedro", "Perez", "pedro@gmail.com", "2345", new Cuentas(2, 2000));
const usuario3 = new Usuario("usuario3","Carlos", "Perez", "carlos@gmail.com", "3456",new Cuentas(3, 3000));

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



// Funciones del boton inicio de sesion
InicioSesion.addEventListener("click", ()=>{
    VerificarUsuario();
    cargarSelectCuentas();
})
//funcuion para verificar si el usuario existe y si los datos son correctos
function VerificarUsuario() {
    const usuarioEncontrado = Usuarioss.find(elemento =>
        elemento.Usuario === usuario.value && elemento.contrasenia === contraseña.value
    );

    if (usuarioEncontrado) {
        console.log("Usuario correcto");
        alert("Bienvenido a Banco Programadores " + usuarioEncontrado.nombre);
        contenedorLogin.classList.add("oculto");
        ContenedorMenuPrincipal.classList.remove("oculto");
        nombre.value = usuarioEncontrado.nombre;
        apellido.value = usuarioEncontrado.apellido;
        localStorage.setItem("usuario", usuarioEncontrado.Usuario);
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
    const nombreUsuario = localStorage.getItem("usuario");
    const usuarioEncontrado = Usuarioss.find(u => u.Usuario === nombreUsuario);

    if (usuarioEncontrado) {
        const nuevaCuenta = new Cuentas(Cuentas.cuentas + 1, 1000);
        usuarioEncontrado.AgregarCuenta(nuevaCuenta);
        localStorage.setItem("usuario", usuarioEncontrado.Usuario);
        alert("Cuenta agregada");
        console.log(usuarioEncontrado.Cuenta);
        cargarSelectCuentas();

    } else {
        alert("Error: No se encontró el usuario en la sesión");
    }
}


// Funcion para mostrar los cuentas en el selector
function cargarSelectCuentas() {
    const nombreUsuario = localStorage.getItem("usuario");
    const usuarioEncontrado = Usuarioss.find(u => u.Usuario === nombreUsuario);

        const selectCuentas = document.createElement("select");
        selectCuentas.id = "selectCuentas";

        usuarioEncontrado.Cuenta.forEach(cuenta => {
            const option = document.createElement("option");
            option.value = cuenta.cuenta;  
            option.textContent = `Cuenta: ${cuenta.cuenta} - Saldo:$${cuenta.saldo}`;
            selectCuentas.appendChild(option);
            localStorage.setItem(`cuenta  ${cuenta.cuenta}`,cuenta.cuenta);
        });

        const contenedorSelect = document.getElementById("contenedorSelect");
        contenedorSelect.innerHTML = ""; 
        contenedorSelect.appendChild(selectCuentas);
    
}




