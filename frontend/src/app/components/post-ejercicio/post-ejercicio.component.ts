import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-post-ejercicio',
  templateUrl: './post-ejercicio.component.html',
  styleUrls: ['./post-ejercicio.component.css']
})
export class PostEjercicioComponent implements OnInit {
  id_post : any;
  post: any = {enunciado_ejercicio : "preload.jpg"} ;
  existeElPost: boolean = true;
  constructor(private postsService :PostsService, private activateRouter :ActivatedRoute ,private router :Router, private usuariosService : UsuariosService) { }

   async ngOnInit() {
    //http:localhost:4200/posts/2  | recordar la ruta posts/:id
                                                    // |-----------|
                                                    // |    
    this.id_post = this.activateRouter.snapshot.params.id;
    console.log(this.id_post);
    let respuesta_server : any = await this.postsService.getPost(this.id_post); 
    if(respuesta_server.status === 'ok') {
      this.post = respuesta_server.data;//Yo le cambie a que bote un elemento y no unna lista en el backedn    
      console.log(this.post);
      console.log(this.post.solucion); 
    }
    if(this.post == "Post no encontrado"){
      console.log("Linea 30");
      this.existeElPost = false;
    }  
    
  }
}
