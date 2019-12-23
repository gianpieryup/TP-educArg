const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload  = multer({dest : './uploads/'});
const fs = require('fs');
const uuid = require('uuid');

const postModel = require('./../models/postModel');

// multer : Destino --> genera un archivo temporal
// Identificamos el archivo, lo copiamos a la carpeta (Leer(temporal) -->(escribir este contenido dentro de la carpeta))
// borramos el archivo temporal
// Insertamos el valor del archivo (nombre) en la tabla

// {nombre_producto, descripcion_producto, foto_producto = uuid, visibilidad_producto, precio_producto, stock_producto}

// producots
// mandamos mensaje : ok
// middleware

// nombre de array, cantidad de elementos que tiene
router.post('/', upload.array('file',1) ,async(req,res,next)=> {

    try {
        console.log("Entro en el controler upload");
        if(req.body.id){
            console.log("El id del usuario, si esta logueado",req.body.id);     
        }
        let nombre_imagen = uuid();
        console.log(req.files[0]);

        let obj = {
            id_curso: Number(req.body.id_curso) ,
            id_usuario: 4,
            enunciado_ejercicio: nombre_imagen,
            solucion: "Uknow"
        }
        console.log(obj);             
        // leo archivo temporal --> escribo un nuevo archivo (con nuevo nombre dentro de una ubicacion x)
        //let cadena = hola/chau
        // cadena.split('/) --> ['hola','chau']

        if(req.files[0].mimetype == 'image/jpeg' || req.files[0].mimetype == 'image/png') {
            let ext = req.files[0].mimetype.split('/'); // [image,jpeg]
            ext = "."+ext[1];
            fs.createReadStream('./uploads/'+req.files[0].filename).pipe(fs.createWriteStream('./uploads/'+nombre_imagen +ext))
            fs.unlink('./uploads/'+req.files[0].filename,(err) => {
                if(err) {
                    console.log(err);
                }
            })
            let post_cargado = await postModel.insertPost(obj);
            console.log("post cargado: ",post_cargado);
            
            res.json({status : 'ok'});
        } else {
            res.json({status : 'invalid'})
        }
        // archivo temporal --> idUnico.jpg
        // en la tabla imagenes idUnico.jpg

        // fs.createReadStream // lee archivo
        // fs.createWriteStream // crea 
        // tmp --> se depositan los archivos temporales
        // public/images --> productos.jpg
    } catch(error) {
        res.status(500).send();
    }
})


module.exports = router;


