import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UploadService } from './../../services/upload.service';

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

  miSolucion : any ;
  presionosubirsolucion : boolean = false;

  solucionFile = null;

  constructor(private postsService :PostsService, private activateRouter :ActivatedRoute ,private router :Router, private usuariosService : UsuariosService,private upload : UploadService) { }

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

    if(localStorage.getItem('usuario')){//si alguien me dice cual es la mejor forma de resolver esta cuestion cuentenme
       console.log("Estas Logeuado");
         
          if(this.post.solucion == null){//REvisar si el valor es undefinide
            console.log("No hay solucion oficial");           
            this.hayOficial = false;//deshabilita el botom de comprar y muestra un mensaje "No hay solucion oficial"
            //Basicamente no te permite comprar la solucion porque no esta todavia disponible
          }else{
            console.log("Hay Sol Oficial");
            
            let buy_solution_oficial : any = await this.usuariosService.solucionesCompradas();
            console.log("Mis Compras = ",buy_solution_oficial.data);
            let miCompra =  buy_solution_oficial.data.filter((s) => s.id_posts == this.id_post);
            console.log(miCompra);
            
            if(miCompra.length > 0){//yo compre esta solucion
              console.log("Yo compre esta solucion");
              this.loCompre = true;//deshabilitar el botom de comprar solucion oficial
            }
          }
            
            //El id me lo saca del JWT
          let answer_own_solution : any = await this.usuariosService.postsRespondidos(); 
          let miSolucion =  answer_own_solution.data.filter((s) => s.id_post == this.id_post);
          console.log(miSolucion);
            
          if(miSolucion.length > 0){//yo subi mi solucion
              console.log("Yo tengo una solucion a se ejercicio");
              this.miSolucion = miSolucion[0];
              console.log(this.miSolucion);
              
              this.noloRespondi = false;
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
  async subirsolucion(){
    this.presionosubirsolucion = true;
  }

  async selectedSolucion(valor) { 
    this.solucionFile = valor.target.files[0];
    console.log(this.solucionFile);
  }
  async subir(){
    const fd = new FormData();
    fd.append('file',this.solucionFile, this.solucionFile.name);
    fd.append('id_post',this.id_post)
    let rta = await this.upload.postSolucion(fd);
    console.log(rta);
    this.router.navigate(['perfil']);
  }

}
