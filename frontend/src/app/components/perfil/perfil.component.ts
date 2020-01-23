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
  //Listas cargadas
  soluciones_compradas : any [] = [];
  posts_respondidos : any [] = [];


  showPassword() {
    this.habilitar_password = true;
    this.password = new FormGroup({
    'password_usuario' : new FormControl('', [Validators.required])
    })

  }
  async cambiarPassword() {
    console.log("el pasword nuevo que elije",this.password.value);
    //Probar cambio de contraseña
    let actualizar_pwd = await this.usuariosService.putPassword(this.password.value);
    console.log(actualizar_pwd);
    this.rooter.navigate(['login']);
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


  }

  async putUsuario(){
    let actualizar_datos = await this.usuariosService.putDatos(this.form.value);
    console.log(actualizar_datos);
    console.log("Nombre de Usuario",this.form.value.nombre_usuario);
    localStorage.setItem('nombre', this.form.value.nombre_usuario);
    this.rooter.navigate(['home']);
  }

  async comprados(){
    //cargar los ejercicios comprados
    let data_soluciones : any = await this.usuariosService.solucionesCompradas();
    console.log(data_soluciones.data);
    this.soluciones_compradas = data_soluciones.data;//No olvidar el [.data]
  }
  
  async resueltos(){
    //cargar los ejercicios respondidos
    let data_respondidos : any = await this.usuariosService.postsRespondidos();
    console.log(data_respondidos);
    this.posts_respondidos = data_respondidos.data;
  }
}
