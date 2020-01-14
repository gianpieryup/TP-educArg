const express = require('express');
const router = express.Router();
const usuariosModel = require('../../models/usuariosModel');

router.get('/:id_cliente', async(req,res,next) => {
    try {//QUE Lo que esta en el JWT(de acuerdo a eso) le muestre la informacion de sus ususarios (asociados a este cliente) 
        if(req.params.id_cliente == req.id_cliente) {//Valida que el acceso de este cliente coincida con el id_cliente que esta en JWT(para que un cliente no se meta con otro)
            let usuarios  = await usuariosModel.getUsuarios(req.params.id_cliente); 
            res.json({status : 'ok', data : usuarios});
        }
    } catch (error) {
        console.log("Error en el controlador controllers/admin",error);
        throw error;
    }
})//Creo que esto es del profe// borrar si no sirve

//Usuario especifico//para el admin solamente-------------------
router.get('/:id_user', async(req,res,next)=> {
    try {
        let user = await usuariosModel.getUsuario( req.params.id_user);
        if(user.length > 0) {
            res.json({ status : 'ok', data : user[0]});
        } else {
            res.json({ status : 'ok', data : "Usuario no encontrado"} );
        }

    } catch(error) {    
        res.status(500).json({status : 'error'});
    }
})

module.exports = router; 