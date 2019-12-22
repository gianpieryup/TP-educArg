var express = require('express');
var router = express.Router();

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



module.exports = router;