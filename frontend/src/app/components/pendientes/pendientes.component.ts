import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.css']
})
export class PendientesComponent implements OnInit {
  hayPendientes : boolean = true;
  postsPendientes : any [] = [];
  constructor(private postsService : PostsService,private rooter : Router) { }

  async ngOnInit() {
    let respuesta_server : any= await this.postsService.getPostsPendientes() 
    if(respuesta_server.status === 'ok') {
      this.postsPendientes = respuesta_server.data;
      console.log(this.postsPendientes);     
    }
    if(this.postsPendientes.length == 0){
      this.hayPendientes = false;
    } 
  }

  async aceptar(id){
    console.log("Aceptaste el post con id = ",id);
    let obj = {estado : 1}
    let respuesta_server : any= await this.postsService.actualizarEstadoPost(id,obj) 
    if(respuesta_server.status === 'ok') {
      location.reload();
    }
    //el services post
  }

  async denegar(id){
    console.log("Denegaste el post con id = ",id);
    let obj = {estado : 2};
    let respuesta_server : any= await this.postsService.actualizarEstadoPost(id,obj) 
    if(respuesta_server.status === 'ok') {
      location.reload();
    }
  }
}
