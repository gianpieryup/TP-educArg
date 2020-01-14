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
  respuesta : string = "";
  solucion: boolean = false;
  //habilitar el botom de comprar solucion oficial
  //habilitar el botom de subir solucionn propia

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
    if (localstorage.getItem('JWT')){//si alguien me dice cual es la mejor forma de resolver esta cuestion cuentenme
        Ambos habilitados en la declaracion d variables
         
          if(this.post.solucion == null){//REvisar si el valor es undefinide
            no hay solucion ->    (y mencionar que no hay solucion oficial todavia)
            deshabilitar el botom de comprar solucion oficial
          }else{
            hay solucion oficial//devolvera un 400 si no estoy logueado y ademas me valida el JWT que usuario soy
            let buy_solution_oficial : any = await this.userService.getSolucionOficial(this.id_post);//El id me lo saca del JWT
            
            TASK:: Crear el servicio en el front y Agregar metodos en el BACK -> en el controler usuarios
            
            let answer_own_solution : any = await this.userService.getSolucionPropia(this.id_post);//El id me lo saca del JWT 

            if(yo compre esta solucion){
              mostrar la solucion
              deshabilitar el botom de comprar solucion oficial
            }

            if(yo subi mi solucion){
              mostrar la solucion(todo) estado/fecha/respuesta
              deshabilitar el botom de subir solucionn propia
            }
          }
     }
    */
    
  }

  async comprar(){
    //debo comprar el ejercicio
    let respuesta_server : any = await this.usuariosService.comprarEjercicio(this.id_post); 
    console.log(respuesta_server);
    if(respuesta_server.status == "Dinero insuficiente"){
      console.log("entro en el dinero insuficiente");
      this.respuesta = "No tiene dinero suficiente";
    }else{
      this.router.navigate(['perfil']);
    }
  }
}
