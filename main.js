import {Usuario} from "./Usuarios.js";

const usuario1 = new Usuario("usuario1","Juan", "Perez", "juanperez@gmail.com", "1234");
const usuario2 = new Usuario("usuario2","Pedro", "Perez", "pedro@gmail.com", "2345");
const usuario3 = new Usuario("usuario3","Carlos", "Perez", "carlos@gmail.com", "3456");

const usuario = document.getElementById("usuario");
const contraseña = document.getElementById("contraseña");
const InicioSesion = document.getElementById("InicioSesion");
const contenedorLogin = document.querySelector(".contenedorLogin");

InicioSesion.addEventListener("click", ()=>{
    if(usuario.value === usuario1.Usuario && contraseña.value === usuario1.contrasenia){
        console.log("Usuario correcto");
        alert("Bienvenido a Banco programadores "+ usuario1.nombre);
        contenedorLogin.classList.add("oculto");
    }
    else if(usuario.value === usuario2.Usuario && contraseña.value === usuario2.contrasenia){
        console.log("Usuario correcto");
        alert("Bienvenido a Banco programadores "+ usuario2.nombre);
        contenedorLogin.classList.add("oculto");
    }
    else if(usuario.value === usuario3.Usuario && contraseña.value === usuario3.contrasenia){
        console.log("Usuario correcto");
        alert("Bienvenido a Banco programadores " + usuario3.nombre);
        contenedorLogin.classList.add("oculto");
}
    else{
        alert("Nombre de usuario o contraseña incorrectos");
    }
})


