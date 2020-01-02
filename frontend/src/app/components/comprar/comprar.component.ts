import { Component, OnInit } from '@angular/core';
import { ModalManager } from 'ngb-modal';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent implements OnInit {
  modalR : any;
  cantidad : number;
  constructor(private modalServices : ModalManager,private rooter : Router,private usuariosService : UsuariosService) { }

  ngOnInit() {
  }
  aceptar(id){
    console.log(id); 
  }
  open(mod,cant){
    this.cantidad = cant;
    this.modalR = this.modalServices.open(mod);
    console.log(this.cantidad);
    
  }
  async comprar(){
    let obj =  {cant: this.cantidad}
    let actualizar_salva = await this.usuariosService.putSalvavidas(obj);
    console.log(actualizar_salva);   
    this.modalServices.close(this.modalR);//Habia que cerrarlo si no, se te pone negro todo
   // this.rooter.navigate(['home']);
  }
}
