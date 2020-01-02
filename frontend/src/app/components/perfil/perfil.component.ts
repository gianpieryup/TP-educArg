import { UsuariosService } from './../../services/usuarios.service';
import { FormGroup , FormControl, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  form : FormGroup;
  password : FormGroup
  show_form : boolean;
  habilitar_password : boolean = false;

  showPassword() {
    this.habilitar_password = true;
    this.password = new FormGroup({
    'password_usuario' : new FormControl('', [Validators.required])
    })

  }
  async cambiarPassword() {
    let actualizar_pwd = await this.usuariosService.putPassword(this.password.value);
    console.log(actualizar_pwd);
  }

  constructor(private usuariosService : UsuariosService, private rooter : Router) { }

  async ngOnInit() {
    let data : any = await this.usuariosService.getUsuario();
    console.log(data);
    if(data.status == 'ok') {
      this.show_form = true;
    } else {
      this.show_form = false;
    }
    this.form = new FormGroup({
      'nombre_usuario' : new FormControl(data.data.nombre_usuario, [Validators.required]),
      'telefono_usuario' : new FormControl(data.data.telefono_usuario, [Validators.required])
    })
    //cargar los ejercicios comprados
      //Tengo ya una ruta para hacerlo
    //(Opcional: cargar los ejercicios publicados)
  }

  async putUsuario(){
    let actualizar_datos = await this.usuariosService.putDatos(this.form.value);
    console.log(actualizar_datos);
    console.log("Nombre de Usuario",this.form.value.nombre_usuario);
    localStorage.setItem('nombre', this.form.value.nombre_usuario);
    this.rooter.navigate(['home']);
  }


}
