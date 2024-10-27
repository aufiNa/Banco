import {Usuario} from "./Usuarios.js";
import {Cuentas} from "./Cuentas.js";

function guardarUsuarioEnLocalStorage(usuario) {
    const usuarioJSON = JSON.stringify(usuario);
    localStorage.setItem(usuario.Usuario, usuarioJSON); // Usa su nombre de usuario como clave
}



function recuperarUsuarioDesdeLocalStorage(nombreUsuario) {
    const usuarioJSON = localStorage.getItem(nombreUsuario);

    if (usuarioJSON) {
        const datos = JSON.parse(usuarioJSON);

        // Verificamos si `cuentas` existe y es un arreglo antes de aplicar `.map`
        const cuentas = Array.isArray(datos.Cuenta)
            ? datos.Cuenta.map(cuentaData => new Cuentas(cuentaData.idcuenta, cuentaData.saldo))
            : []; // Si `cuentas` no existe, lo inicializamos como un arreglo vacío

        return new Usuario(datos.Usuario, datos.nombre, datos.apellido, datos.email, datos.contrasenia, cuentas);
    }

    return null; // Retorna null si no se encuentra el usuario
}

const usuarioEncontrado = recuperarUsuarioDesdeLocalStorage("usuario");
console.log(usuarioEncontrado);



cargarSelectCuentas();


function cargarSelectCuentas() {
    
        const selectCuentas = document.createElement("select");
        selectCuentas.id = "selectCuentas";
        console.log(usuarioEncontrado.Cuenta[Cuentas.acounts - 1].length);
        
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

