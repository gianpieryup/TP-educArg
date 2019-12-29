import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.component.html',
  styleUrls: ['./ejercicios.component.css']
})
export class EjerciciosComponent implements OnInit {
  posts : any [] = [];
  admin : boolean = false;//para saber si es admin o no
  constructor(private postsService : PostsService,private rooter : Router) { }

  async ngOnInit() {
    let respuesta_server : any= await this.postsService.getPosts() 
    if(respuesta_server.status === 'ok') {
      this.posts = respuesta_server.data;
      console.log(this.posts);
      
    }
  }

  navigate(id : number){
    //redireccionar a la avista del producto
    //recordar que para acceder a estos | dbemos incluir en el conttructor
    this.rooter.navigate(['posts',id]);
    //esta notacion de [navigate] concatena cosas con (,)| Un array que conactena cosas
    //armarlo de la forma tradicional con +
  }

}
