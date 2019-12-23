import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class BaseService {
  url_server =  environment.url_server;
  endpoint = "";
  code: boolean = false;  //para que ueda cambiarlo

  constructor(private http : HttpClient, private router : Router) { }

  setCode(code) {
    // defina el httpHeadersOptions si es 'content-type' : 'application/json',
    this.code = code;
  }

  getHttpOptions() {
    let httpHeadersOptions : any  = {}
    try {
      if(this.code) {//sto le pega el upload para que pase formato mullti
        httpHeadersOptions = {
          headers : new HttpHeaders({
            'content-type' : 'application/json',
            Authorization : localStorage.getItem('usuario') // token
          })
        } 
      } else {

        if(localStorage.getItem('usuario')){
          // content-type : 'application/json'
          // Authorization : sesion
          httpHeadersOptions = {
            headers : new HttpHeaders({
             'content-type' : 'application/json',
              Authorization : localStorage.getItem('usuario') // token
            })
          } 
        } else {
          httpHeadersOptions = {
            headers : new HttpHeaders({
              // 'content-type' : 'application/json'
            })
          }
        }
        return httpHeadersOptions;
      }
    } catch(error) {
      console.log(error);
    }
  }

  processResponseError(e) {
    if(e.error == 401) {
      localStorage.clear();
      this.router.navigate(['/'])
    } else {
      throw e;
    }
  }

  setEndPoint(endpoint) {
    // defina el endpoint para hacer la peticion al REST
    this.endpoint = endpoint;
  }

  async get() {
    // este metodo devuelve la respuesta que envía el servidor en formato JSON
    try {
      const options : any = this.getHttpOptions(); // {headers : }
      return this.http.get(this.url_server + this.endpoint, options).toPromise();

    } catch(error) {
      console.log(error);
      
      this.processResponseError(error)
    }
  }

  async post(obj) {
    try {
      // http://localhost:3000/usuarios/1
      console.log(this.url_server + this.endpoint);
      const options = this.getHttpOptions();
      return this.http.post(this.url_server + this.endpoint  , obj, options).toPromise();
      
    } catch(error) {
      throw error;
    }
  }
  async put(obj) {
    try {
      // http://localhost:3000/usuarios/1
      console.log(this.url_server + this.endpoint );
      const options = this.getHttpOptions();
      return this.http.put(this.url_server + this.endpoint  , obj, options).toPromise();
      
    } catch(error) {
      throw error;
    }
  }
}
