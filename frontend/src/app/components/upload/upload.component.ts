import { UploadService } from './../../services/upload.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  selectedFile = null;
  cursoElegido: string = "0" ;  
  solucionFile = null;

  constructor(private upload : UploadService, private rooter : Router) { }

  onFileSelected(valor) { 
    // en caso que sea solo una imagen (<input type='file'> )
    this.selectedFile = valor.target.files[0];
    console.log(this.selectedFile);
    // {IMAGEN}
  }

  selectedSolucion(valor) { 
    this.solucionFile = valor.target.files[0];
    console.log(this.solucionFile);
  }

  async subir() {
    // paquete de datos
    const fd = new FormData();
    // append('key','valor')
    // req.body.comentario
    // {key : 'value'}

    // 'file', imagen, 'dni.jpg'
    fd.append('file',this.selectedFile, this.selectedFile.name);
    if(this.solucionFile){
      fd.append('file',this.solucionFile, this.solucionFile.name);
    }

    fd.append('id_curso',this.cursoElegido)

    let rta = await this.upload.postData(fd);
    console.log(rta);
    
    this.rooter.navigate(['home']);
  }

  select(val) {
    console.log(val);
    this.cursoElegido = val;
  }

  ngOnInit() {
      // app.miproyecto.com.ar/images/
    }

}

