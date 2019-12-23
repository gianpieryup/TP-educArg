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

  constructor(private upload : UploadService, private rooter : Router) { }

  onFileSelected(valor) { 
    console.log(valor);
    // en caso que sea solo una imagen (<input type='file'> )
    this.selectedFile = valor.target.files[0];
    // {IMAGEN}
  }

  async subir() {
    // paquete de datos
    const fd = new FormData();
    // append('key','valor')
    // req.body.comentario
    // {key : 'value'}

    // 'file', imagen, 'dni.jpg'
    fd.append('file',this.selectedFile, this.selectedFile.name);
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

      // get de todos los productos
      // app.miproyecto.com.ar/images/
      
    }

}

