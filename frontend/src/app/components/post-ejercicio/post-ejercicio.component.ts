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
  respuesta : string;
  solucion: boolean = false;

  constructor(private postsService :PostsService, private activateRouter :ActivatedRoute ,private router :Router, private usuariosService : UsuariosService) { }

   async ngOnInit() {
    //http:localhost:4200/posts/2  | recordar la ruta posts/:id
                                                    // |-----|
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
    /*
    
    Si (estoy logueado)
      Ambos habilitados en la declaracion d variables
              habilitar el botom de comprar solucion oficial
              habilitar el botom de subir solucionn propia
          
          habiliar el botom de comprar solucion solo si hay una solucion oficial,
          if(solucion == null){
            no hay solucion ->    (y mencionar que no hay solucion oficial todavia)
            deshabilitar el botom de comprar solucion oficial
          }else{
            hay solucion oficial        
            if(yo compre esta solucion){
              mostrar la solucion
              deshabilitar el botom de comprar solucion oficial
            }

            if(yo subi mi solucion){
              mostrar la solucion(todo) estado/fecha/respuesta
              deshabilitar el botom de subir solucionn propia
            }
          }

    */
    
  }

  async comprar(){
    //debo comprar el ejercicio
    let respuesta_server : any = await this.usuariosService.comprarEjercicio(this.id_post); 
    console.log(respuesta_server);
    if(respuesta_server.status = 'Dinero insuficiente'){
      this.respuesta = "No tiene dinero suficiente"
    }else{
      this.router.navigate(['perfil']);
    }
  }
}
