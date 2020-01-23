var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload  = multer({dest : './uploads/'});
const fs = require('fs');

const postModel = require('../../models/postModel');

router.get('/pendientes', async(req,res,next)=> {
    try {
        if(req.id && req.role == 'admin'){//Solo ingresan los admin
            let post_pendientes = await postModel.getAllPost(0);
            res.json({ status : 'ok',data : post_pendientes});
        }
        else{
            res.status(401).json({status : 'No eres admin'});
        }

    } catch(error) {
        console.log(error);
        res.status(500).json({status : 'error'})
    }
})

//sin Solucion oficial
router.get('/sinSolucionOficial', async(req,res,next)=> {
    try {
        if(req.id && req.role == 'admin'){//Solo ingresan los admin
            console.log("GET /sinSolucionOficial");
            let post_sin_solOficial = await postModel.postSinSolucionOficial();
            console.log("Linea 28 : ",post_sin_solOficial);  
            res.json({ status : 'ok',data : post_sin_solOficial});
        }
        else{
            res.status(401).json({status : 'No eres admin'});
        }

    } catch(error) {
        console.log(error);
        res.status(500).json({status : 'error'})
    }
})

//actualizar el estado del  post del usuario
//este es el botom de rechazar o aceptar el post del usuario
router.put('/:id_post', async(req,res,next)=> {
    try {
        
        let obj ={
            solucion : req.body.solucion,
            id_usuario_solucion : req.body.id_usuario_solucion,
            estado : req.body.estado
        }
        console.log("PUT admin/posts",obj);
        
        // console.log("Entro a posts.js -> al metodo put ");       
        // let estado = req.body.estado;
        // console.log("Estado: ",estado);
        
        let update_ejercicio = await postModel.updatePost(obj,req.params.id_post);
        res.json({status : 'ok', data : update_ejercicio})

    } catch(error) {
        console.log(error);
        res.status(500).json({status : 'error'})
    }
})




module.exports = router;