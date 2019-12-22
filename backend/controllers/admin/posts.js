var express = require('express');
var router = express.Router();

const postModel = require('../../models/postModel');

router.get('/pendientes', async(req,res,next)=> {
    try {
        let post_pendientes = await postModel.getAllPost(0);
        res.json({ status : 'ok',data : post_pendientes});

    } catch(error) {
        console.log(error);
        res.status(500).json({status : 'error'})
    }
})

//actualizar el estado del  post del usuario
//este es el botom de rechazar o aceptar el post del usuario
router.put('/:id_post', async(req,res,next)=> {
    try {
        let estado = req.body.estado;
        //podemos tambien editar la materia
        let update_ejercicio = await postModel.updatePost(estado,req.params.id_post);
        res.json({status : 'ok', data : update_ejercicio})

    } catch(error) {
        console.log(error);
        res.status(500).json({status : 'error'})
    }
})


module.exports = router;