import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from './../../services/upload.service';

@Component({
  selector: 'app-admin-post',
  templateUrl: './admin-post.component.html',
  styleUrls: ['./admin-post.component.css']
})
export class AdminPostComponent implements OnInit {
  id_post : any;
  post: any = {enunciado_ejercicio : "preload.jpg"} ;
  solucionFile = null;
  id_user : any;

  constructor(private postsService :PostsService,private activateRouter :ActivatedRoute,private router :Router ,private upload : UploadService) { }

  async ngOnInit() {
    this.id_post = this.activateRouter.snapshot.params.id;
    let respuesta_server : any = await this.postsService.getPost(this.id_post); 
    if(respuesta_server.status === 'ok') {
      this.post = respuesta_server.data;//Yo le cambie a que bote un elemento y no unna lista en el backedn    
      console.log(this.post);
      console.log(this.post.solucion); 
    }
  }

  async selectedSolucion(valor) { 
    this.solucionFile = valor.target.files[0];
    console.log(this.solucionFile);
  }


  async subir(){
    console.log(this.id_user);
    
    const fd = new FormData();
    fd.append('file',this.solucionFile, this.solucionFile.name);
    fd.append('id_post',this.id_post)
    fd.append('id_user',this.id_user)
    let rta = await this.upload.postSolucionOficial(fd);
    console.log(rta);
  //  this.router.navigate(['pendientes']);
  }
}
