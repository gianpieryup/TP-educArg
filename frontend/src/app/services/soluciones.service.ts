import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SolucionesService extends BaseService{
  //Probar estos dos 
  async getSolucionesPendientes() {
    try {//Trae todos las soluciones de los usuarios con estado pendiente
      this.setEndPoint('admin/soluciones/pendientes');
      return this.get();
    } catch(error) {  throw error;  }
  }

  //Para modificar una solucion
  async putSoluciones(obj) {
    try {//El obj debe contener todo id del post y del usuario
      this.setEndPoint('admin/soluciones');
      return this.put(obj);
    } catch(error) {  throw error;  }
  }

}
