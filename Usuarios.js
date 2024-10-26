export class Usuario{
    #Usuario;
    #nombre;
    #apellido;
    #email;
    #contrasenia;
    #Cuenta;
    constructor(Usuario,nombre, apellido, email, contrasenia, cuenta){
        this.#Usuario = Usuario;
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#email = email;
        this.#contrasenia = contrasenia;
        this.#Cuenta = [];
        this.#Cuenta.push(cuenta);
    }
    get Usuario(){
        return this.#Usuario;
    }
    get nombre(){
        return this.#nombre;
    }
    get apellido(){
        return this.#apellido;
    }
    get email(){
        return this.#email;
    }
    get contrasenia(){
        return this.#contrasenia;
    }
    get Cuenta(){
        return this.#Cuenta;
    }
    set contrasenia(NuevaContrasenia){
        this.#contrasenia = NuevaContrasenia;
    }
    set Usuario(NuevoUsuario){
        this.#Usuario = NuevoUsuario;
    }

    AgregarCuenta(cuenta){
        this.#Cuenta.push(cuenta);
    }
}
