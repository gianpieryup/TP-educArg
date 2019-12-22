const express = require('express');
const router = express.Router();
const registroModel = require('../models/registroModel');
//  Registro de usuario
const uuid = require('uuid');
const md5 = require('md5');

router.post('/', async(req,res,next) => {
    try {
        let obj = {
            nombre_usuario : req.body.nombre,
            mail_usuario : req.body.mail,
            password_usuario : md5(req.body.password),
            telefono_usuario : req.body.telefono,
            codigo_mail_usuario : uuid()   
        }
        let registro_ok = await registroModel.registrar(obj);
        if(registro_ok) {
            res.json({status : 'ok', message : 'Se envio un correo a tu cuenta de mail'})
        } else {
            res.status(500).json({status:"error"});

        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({status:"error"});
    }
})

module.exports  = router; 
