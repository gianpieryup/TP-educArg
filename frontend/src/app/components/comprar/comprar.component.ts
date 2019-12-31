import { Component, OnInit } from '@angular/core';
import { ModalManager } from 'ngb-modal';


@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent implements OnInit {
  modalR : any;
  cantidad : number;
  constructor(private modalServices : ModalManager) { }

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
}
