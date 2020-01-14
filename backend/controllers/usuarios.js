const express = require('express');
const router = express.Router();
const usuariosModel = require('../models/usuariosModel');
const compraModel = require('../models/compraModel'); //Para historial que esta deshabilitada
const solucionesModel = require('../models/solucionesmodel');


router.put('/changedatos', async(req,res,next)=> {
    try {
        let actualizar_data = await usuariosModel.putUsuarioDatos(req.body.nombre_usuario, req.body.telefono_usuario,req.id);
        res.json({status : 'ok', data : actualizar_data})
    } catch(error) {
        console.log(error);
        res.status(500).json({status : 'error'})
    }
})

router.put('/changepassword', async(req,res,next)=> {
    try {
        ///changepassword/:id pero el id sale del req.id -> se lo quito
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

//  Probar estos dos de un [usuario]
// Esto me trae las soluciones compradas por el usuario logueado
router.get('/solucionesCompradas', async(req,res,next)=> {
    try {
        console.log("El id del JWT: ",req.id);
        let soluciones_compradas = await solucionesModel.solucionesCompradas(req.id);
        res.json({status : 'ok', data: soluciones_compradas})
    } catch(error) {
        console.log(error);
        res.status(500).json({status : 'error'});
    }
})

//esto me trae las soluciones que respondidas por el usuario
router.get('/postsRespondidos', async(req,res,next)=> {
    try {
        console.log("El id del JWT: ",req.id);
        let posts_respondidos = await solucionesModel.postsRespondidos(req.id);
        res.json({status : 'ok', data: posts_respondidos})
    } catch(error) {
        console.log(error);
        res.status(500).json({status : 'error'});
    }
})


module.exports = router;