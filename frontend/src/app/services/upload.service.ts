import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService extends BaseService {

   postData(obj) {
    try {
     
      this.setEndPoint('upload');
     // this.getHttpOptions(true);
      // http://localhost:300/upload/1
      return this.post(obj);
    } catch(error) {
      throw error;
    }
  }
}
