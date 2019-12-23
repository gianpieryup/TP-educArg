const express = require('express');
const router = express.Router();

const postModel = require('./../models/postModel');

//Todos los post confirmados que accede cualquier usuario
router.get('/', async(req,res,next)=> {
    try {
        let post_aceptados = await postModel.getAllPost(1);
        res.json({ status : 'ok',data : post_aceptados});

    } catch(error) {
        console.log(error);
        res.status(500).json({status : 'error'})
    }
})

//Post filtrado por curso :PendienteCCCCCCCCCCCCCCCCCCCCCCCCC

//Post especifico
router.get('/:id_post', async(req,res,next)=> {
    try {//podria restringir aa que no pueda buscar uno pendiente| es nesesario
        let post = await postModel.getPost( req.params.id_post);
        if(post.length > 0) {
            res.json({ status : 'ok',data : post[0]});
        } else {
            res.json({ status : 'ok' , data : "Post no encontrado"} );
        }

    } catch(error) {    
        res.status(500).json({status : 'error'});
    }
})

router.post('/cargar', async(req,res,next)=> {
    try {//podria restringir aa que no pueda buscar uno pendiente| es nesesario
        let obj = {
            id_curso : 1 ,
            id_usuario : 4,
            enunciado_ejercicio : "Enunciado prueba",
            solucion : "Uknow"
        }
        let post_cargado = await postModel.insertPost(obj);
        if(post_cargado != undefined) {
            res.json({status : 'ok', message : 'Producto dado de alta'});
        } 
    } catch(error) {    
        res.status(500).json({status : 'error'});
    }
})

module.exports = router;