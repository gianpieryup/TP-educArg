import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService extends BaseService{

  async uploadFile(obj) {//Actualizar Informacion del usuario
    this.setEndPoint('upload');
    return this.post(obj);
  }

  async postUsuario(obj) {
    try {
      this.setEndPoint('registro');
      return this.post(obj)
    } catch(error) {
      // error
    }
  }

  async loginUsuario(obj) {
    try {
      this.setEndPoint('auth/login');
      return this.post(obj);
    } catch(error) {
      throw  error;
    }
  }

  async getUsuario() {
    try {
      this.setEndPoint('usuarios');
      return this.get();
    } catch (error) {
      throw  error;
    }
  }

  //Cambiar contraseña 
  async putPassword(obj) {
    this.setEndPoint('usuarios/changepassword');
    return this.put(obj);
  }

  async putDatos(obj) {
    this.setEndPoint('usuarios/changedatos');
    return this.put(obj);
  }
  //Comprar salvavidas
  async putSalvavidas(obj) {
    this.setEndPoint('usuarios/saldoUpdate');
    return this.put(obj);
  }

  //Comprar ejercicio
  async comprarEjercicio(id) {
      this.setEndPoint('compra/'+id);
      return this.post({});
  }
  //Soluciones Compradas [Pendiente|Probar]
  async solucionesCompradas() {
    try {
      this.setEndPoint('usuarios/solucionesCompradas');
      return this.get();
    } catch (error) {throw  error;}
  }
  //Posts Respondidos [Pendiente|Probar]
  async postsRespondidos() {
    try {
      this.setEndPoint('usuarios/postsRespondidos');
      return this.get();
    } catch (error) {throw  error;}
  }

}
