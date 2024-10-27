import {Usuario} from "./Usuarios.js";


export class Banco{
    idcuenta;
    saldo;
    static acounts = 1;
    constructor(saldo){
        this.idcuenta = Banco.acounts ++;
        this.saldo = saldo;
        
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
 
  Transferencia(idcuenta1, idcuenta2, cantidad){
      let cuenta1 = this.Banco.find(cuenta => cuenta.idcuenta === idcuenta1);
      let cuenta2 = this.Banco.find(cuenta => cuenta.idcuenta === idcuenta2);
      if(cuenta1 && cuenta2){
          cuenta1.saldo = cuenta1.saldo + cantidad;
          cuenta2.saldo = cuenta2.saldo - cantidad;
          return cuenta1;
      }
      else{
          return null;
      }

  }



}