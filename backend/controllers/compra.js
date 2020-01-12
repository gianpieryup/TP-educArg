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
            console.log("Info del usuario",user[0]);               
            if(user[0].salvavidas <= 0){
                console.log("compra.js linea 16");
                res.json({status : 'Dinero insuficiente'});
            }else{
                let compra_ok = await compraModel.comprar(req.id,req.params.id_post);  
                res.json({status : 'ok', url : compra_ok});
            }
        } else {
            res.status(401).json({status : 'unauthorized'});
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({status : 'error'})
    }
})



module.exports = router; 