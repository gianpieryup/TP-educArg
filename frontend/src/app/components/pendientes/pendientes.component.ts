import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';
//import { Location } from '@angular/common';
import { SolucionesService } from 'src/app/services/soluciones.service';


@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.css']
})
export class PendientesComponent implements OnInit {
  hayPendientes : boolean = true;
  postsPendientes : any [] = [];
  soluciones_pendientes : any [] = [];
  postSinSolucionOficial : any [] = [];

  constructor(private postsService : PostsService,private rooter : Router,private solucionesService : SolucionesService) { }

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

  async aceptar(post){
    console.log(post);
    let obj = {estado : 1}
    let respuesta_server : any= await this.postsService.updatePost(post.id_post,obj) 
    if(respuesta_server.status === 'ok') {
      location.reload();
    }
    //el services post
  }

  async denegar(post){
    console.log(post);
    let obj = {estado : 2};
    let respuesta_server : any= await this.postsService.updatePost(post.id_post,obj) 
    if(respuesta_server.status === 'ok') {
      location.reload();
    }
  }

  async solucionesPendientes(){
    let respuesta_server : any= await this.solucionesService.getSolucionesPendientes() ;
    console.log(respuesta_server);
    this.soluciones_pendientes = respuesta_server.data;
  }

  async sinOficial(){
    let respuesta_server : any= await this.postsService.sinSolucionOficial() ;
    console.log(respuesta_server);
    this.postSinSolucionOficial = respuesta_server.data;
  }
  // async resIndividual(){
  //   this.rooter.navigate(['posts/',1]);
  // }
}
