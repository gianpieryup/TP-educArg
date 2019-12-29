import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService extends BaseService {

   async getPosts() {
    // /productos
    try {
      this.setEndPoint('posts');//importar el enviroment 
      return this.get();
    } catch(error) {
      throw error;
    }
  }

   async getPost(id){
    //productos/1
    try {
      this.setEndPoint('posts/'+id);
      return this.get();
    } catch (error) {
      throw error; 
    }
  }
  
  //------------  Admin  -----------------------------
  async getPostsPendientes() {
    // /productos
    try {
      this.setEndPoint('admin/posts/pendientes');
      return this.get();
    } catch(error) {
      throw error;
    }
  }

  async actualizarEstadoPost(id_post,obj) {
    // /productos
    try {
      this.setEndPoint('admin/posts/' + id_post);
      return this.put(obj);
    } catch(error) {
      throw error;
    }
  }

}
