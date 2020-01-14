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
  respuesta : string = "";//Se usa para validar la respuesta

  hayOficial: boolean = true;
  loCompre : boolean = false;
  noloRespondi : boolean = true;
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

    if (localStorage.getItem('JWT')){//si alguien me dice cual es la mejor forma de resolver esta cuestion cuentenme
        //Ambos habilitados en la declaracion d variables
         
          if(this.post.solucion == null){//REvisar si el valor es undefinide
            this.hayOficial = false;//deshabilita el botom de comprar y muestra un mensaje "No hay solucion oficial"
          }else{
            //hay solucion oficial
            let buy_solution_oficial : any = await this.usuariosService.solucionesCompradas();
            //El id me lo saca del JWT
            let answer_own_solution : any = await this.usuariosService.postsRespondidos(); 
            let miSolucion =  answer_own_solution.filter(s => s.id_post == this.id_post);
            console.log(miSolucion);
            
            if(buy_solution_oficial.indexOf(this.id_post) != -1){//yo compre esta solucion
              //mostrar la solucion
              this.loCompre = true;//deshabilitar el botom de comprar solucion oficial
            }

            if(miSolucion.length > 0){//yo subi mi solucion
              this.noloRespondi = false;
             // deshabilitar el botom de subir solucion propia
            }
          }
     }
    
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
