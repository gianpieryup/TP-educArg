const express = require('express');
const router = express.Router();
const usuariosModel = require('../models/usuariosModel');
const compraModel = require('../models/compraModel')

router.put('/changedatos/:id', async(req,res,next)=> {
    try {
        let actualizar_data = await usuariosModel.putUsuarioDatos(req.body.nombre_usuario, req.body.telefono_usuario,req.id);
        res.json({status : 'ok', data : actualizar_data})
    } catch(error) {
        console.log(error);
        res.status(500).json({status : 'error'})
    }
})

router.put('/changepassword/:id', async(req,res,next)=> {
    try {

        console.log(req.body.password_usuario);
        let actualizar_data = await usuariosModel.putUsuarioPassword(req.body.password_usuario,req.id);
        res.json({status : 'ok'})
    } catch(error) {
        console.log(error);
        res.status(500).json({status : 'error'});
    }
})


//Este es el que uso , el id lo saca del JWT(por que estoy logueado)
router.get('/', async(req,res,next)=> {
    try {
        //en el JWT esta el {id : "el id del usuario logueado"}
        let usr_data = await usuariosModel.getUsuario(req.id);
        if(usr_data.length > 0) {
            res.json({ status : 'ok', data : usr_data[0]});
        } else {
            res.json({ status : 'ok', data : "usuario no valido"} );
        }
    } catch (error) {
        res.status(500).json({status : 'error'});
    }
})

//Usuario especifico//para el admin solamente-------------------
router.get('/:id_user', async(req,res,next)=> {
    try {
        let user = await usuariosModel.getUsuario( req.params.id_user);
        if(user.length > 0) {
            res.json({ status : 'ok', data : user[0]});
        } else {
            res.json({ status : 'ok', data : "Post no encontrado"} );
        }

    } catch(error) {    
        res.status(500).json({status : 'error'});
    }
})

/*router.get('/historial', async(req,res,next)=> {
    try {
        console.log("Mira la informacion que se guardo en el token, se instancio en el auth.js");
        console.log("El id: ",req.id);
        console.log("El role: ",req.role);
        
        let historial_user = await compraModel.historial(req.id);
        res.json({status : 'ok', data : historial_user});
    } catch (error) {
        res.status(500).json({status : 'error'});
    }
})*/

router.put('/saldoUpdate', async(req,res,next)=> {
    try {
        console.log("El id del JWT: ",req.id,"  la cant comprada: ",req.body.cant);
        let actualizar_data = await usuariosModel.putUsuarioSalvavidas(req.body.cant,req.id);
        res.json({status : 'ok', data: actualizar_data})
    } catch(error) {
        console.log(error);
        res.status(500).json({status : 'error'});
    }
})

module.exports = router;