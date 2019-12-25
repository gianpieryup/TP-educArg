const express = require('express');
const router = express.Router();
const compraModel = require('./../models/compraModel');
const usuariosModel = require('./../models/usuariosModel');

//Comprar solucion del ejercicio/ usuario logueado (JWT)
router.post('/:id_post',async(req,res,next)=>{
    try {
        if(req.id) {

            //validacion de que tiene dinero
            let user = await usuariosModel.getUsuario(req.id);
            if(user.salvavidas = 0){
                res.status(401).json({status : 'Dinero insuficiente'});
            }
            let compra_ok = await compraModel.comprar(req.id,req.params.id_post);   //req.id |(este :id) del usuario,Lo saca magicamente del token
            // compra_ok : url de mercadoPago
            res.json({status : 'ok', url : compra_ok});
        } else {
            res.status(401).json({status : 'unauthorized'});
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({status : 'error'})
    }
})



module.exports = router; 