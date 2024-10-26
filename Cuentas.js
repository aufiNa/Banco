export class Cuentas{
    idcuenta;
    saldo;
    static acounts = 0;
    constructor(idcuenta, saldo){
        this.idcuenta = idcuenta;
        this.saldo = saldo;
        Cuentas.acounts ++;
    }
    get cuenta(){
        return this.idcuenta;
    }
    get saldo(){
        return this.saldo;
    }
    set saldo(nuevoSaldo){
        this.saldo = nuevoSaldo;
    }
  static get acounts(){
      return this.acounts;
  }
 
}