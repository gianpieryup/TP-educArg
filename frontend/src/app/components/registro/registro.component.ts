import { UsuariosService } from './../../services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  form : FormGroup;
  temporal : boolean = false;

  constructor(private usuariosService : UsuariosService, private rooter : Router) { }

  arrayValidators = [];
  ngOnInit() {
    // this.arrayValidators.push('Validators.required');
    // this.arrayValidators.push('Validators.minLeng')
    // activar los controles
    this.form = new FormGroup({
      'nombre' : new FormControl('',[Validators.required,Validators.minLength(5)]),
      'mail' : new FormControl('',[Validators.required,Validators.email]),
      'telefono' : new FormControl('',[Validators.required]),
      'password' : new FormControl('',[Validators.required]),
      })
  }

  async registrar() {
    // console.log(this.form)
    // console.log(this.form.value);
    // // console.log(this.form.get('nombre'));
    // console.log(this.form.get('nombre').status);
    // console.log(this.form.get('nombre').touched);
    // https://www.npmjs.com/package/sweetalert
    // $ npm install --save sweetalert2

    this.temporal = true; 
    console.log(this.temporal);
    
    let post_ok : any = await this.usuariosService.postUsuario(this.form.value);
    

    if(post_ok.status == "ok") {
      await Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Usuario registrado correctamente, confirma el correo para seguir',
        showConfirmButton: true,
        timer: 3500,
      })
   
      this.form.reset();
      this.rooter.navigate(['login']);
    } else {
    }

  }

}

