import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService extends BaseService {

   postData(obj) {
    try {  
      this.setEndPoint('upload');
      this.setCode(true);
      // http://localhost:300/upload/1
      return this.post(obj);
    } catch(error) {
      throw error;
    }
  }

  async postSolucion(obj) {
    try {  
      this.setEndPoint('upload/solucionPropia');
      this.setCode(true);
      // http://localhost:300/upload/solucionPropia
      return this.post(obj);
    } catch(error) {
      throw error;
    }
  }
}
