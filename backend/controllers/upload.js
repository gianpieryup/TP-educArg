const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload  = multer({dest : './uploads/'});
const fs = require('fs');
const uuid = require('uuid');

const postModel = require('./../models/postModel');
const solucionesModel = require('../models/solucionesmodel');

// multer : Destino --> genera un archivo temporal
// Identificamos el archivo, lo copiamos a la carpeta (Leer(temporal) -->(escribir este contenido dentro de la carpeta))
// borramos el archivo temporal
// Insertamos el valor del archivo (nombre) en la tabla

// nombre de array, cantidad de elementos que tiene
router.post('/', upload.array('file',2) ,async(req,res,next)=> {

    try {            
        console.log("Llego al cotroller upload.js");
        console.log(req.files[0]);
        let nombre_ejercicio = req.files[0].filename;
        //Implementacion de la parte solucion

        // leo archivo temporal --> escribo un nuevo archivo (con nuevo nombre dentro de una ubicacion x)
        // let cadena = hola/chau
        // cadena.split('/) --> ['hola','chau']
        if(req.files[0].mimetype == 'image/jpeg' || req.files[0].mimetype == 'image/png') {
            console.log("Enntro linea 31");
            
            let ext = req.files[0].mimetype.split('/'); // [image,jpeg]
            ext = "."+ext[1];
            fs.createReadStream('./uploads/'+req.files[0].filename).pipe(fs.createWriteStream('./uploads/'+nombre_ejercicio +ext))
            console.log("Linea 36");
            
            fs.unlink('./uploads/'+req.files[0].filename,(err) => {
                if(err) {
                    console.log("error linea 40");
                    console.log(err);
                }
            })
            console.log("Linea 44",nombre_ejercicio + ext);
            
            let obj = {
                id_curso: Number(req.body.id_curso) ,
                id_usuario: req.id,
                enunciado_ejercicio: nombre_ejercicio + ext,
            }
            console.log(obj);  

            let post_cargado = await postModel.insertPost(obj);
            console.log("post cargado: ",post_cargado);
            
            //Cargo solucion ?? req.files[1]
            if(req.files[1]){
                if(req.files[1].mimetype == 'image/jpeg' || req.files[1].mimetype == 'image/png') {
                    console.log("Enntro linea 56");
                    let nombre_solucion = req.files[1].filename;//uuid()
                    let ext = req.files[1].mimetype.split('/'); // [image,jpeg]
                    ext = "."+ext[1];
                    fs.createReadStream('./uploads/'+req.files[1].filename).pipe(fs.createWriteStream('./uploads/'+nombre_solucion +ext))
                    console.log("Linea 60");
                    
                    fs.unlink('./uploads/'+req.files[1].filename,(err) => {
                        if(err) {
                            console.log("error linea 64");
                            console.log(err);
                        }
                    })
                    console.log("Linea 68",nombre_solucion + ext);
                    
                    let obj = {
                        id_post: post_cargado ,
                        id_user_solucion: req.id,
                        id_solucion: nombre_solucion + ext,
                    }
                    console.log("Insertar la solucion",obj);  
        
                     let solucion_usuario = await solucionesModel.cargarSolucion(obj);
                     console.log("post cargado: ",solucion_usuario);
    
                }
            }else{
                console.log("No cargo una solucion");
            }

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

router.post('/solucionPropia', upload.array('file',1) ,async(req,res,next)=> {

    if(req.files[0].mimetype == 'image/jpeg' || req.files[0].mimetype == 'image/png') {
        console.log("Enntro linea 106");
        let nombre_solucion = req.files[0].filename;
        console.log(nombre_solucion);
        
        let ext = req.files[0].mimetype.split('/'); // [image,jpeg]
        ext = "."+ext[1];//cuidado con la extension :)
        console.log(ext);
        
        fs.createReadStream('./uploads/'+req.files[0].filename).pipe(fs.createWriteStream('./uploads/'+nombre_solucion +ext))
        console.log("Linea 111");
        
        fs.unlink('./uploads/'+req.files[0].filename,(err) => {
            if(err) {
                console.log("error linea 115");
                console.log(err);
            }
        })
        console.log("Linea 119",nombre_solucion + ext);
        
        let obj = {
            id_post: Number(req.body.id_post) ,
            id_user_solucion: req.id,
            id_solucion: nombre_solucion + ext,
        }
        console.log("Insertar la solucion",obj);  

         let solucion_usuario = await solucionesModel.cargarSolucion(obj);
         res.json({status : 'ok', data:solucion_usuario})
        
    }else {
        res.json({status : 'invalid'})
    }
})

module.exports = router;


