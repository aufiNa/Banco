import {Usuario }from "./Usuario.js";
import { Cuentas } from "./Cuentas.js";

export let Usuariosss = [
    new Usuario("usuario1","Juan","Perez","1234",new Cuentas(1000, "usuario1")),
    new Usuario("usuario2","Pedro","Perez","2345",new Cuentas(2000, "usuario2")),
    new Usuario("usuario3","Carlos","Perez","3456",new Cuentas(3000, "usuario3"))
]