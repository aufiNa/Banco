export class Cuentas{
    #idcuenta;
    #saldo;
    static #cuentas = 0;
    constructor(idcuenta, saldo){
        this.#idcuenta = idcuenta;
        this.#saldo = saldo;
        Cuentas.#cuentas ++;
    }
    get cuenta(){
        return this.#idcuenta;
    }
    get saldo(){
        return this.#saldo;
    }
    set saldo(nuevoSaldo){
        this.#saldo = nuevoSaldo;
    }
  static get cuentas(){
      return this.#cuentas;
  }

}