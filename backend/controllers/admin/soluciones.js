const express = require('express');
const router = express.Router();
const solucionModel = require('../../models/solucionesmodel');


router.put('/', async(req,res,next)=> {
    try {
        console.log("Entro al ADMIN solucioness.js -> al metodo put ");       
        let obj = {
            estado = req.body.estado,
            respuesta = req.body.respuesta
        }
        //se identifica la clave compuesta por: id_user_solucion && id_post 
        console.log("Estado: ",obj);
        
        let update_solucion = await solucionModel.updateSolucion(obj,req.body.id_user_solucion,req.body.id_post);
        res.json({status : 'ok', data : update_solucion})

    } catch(error) {
        console.log(error);
        res.status(500).json({status : 'error'})
    }
})


router.get('/pendientes', async(req,res,next)=> {
    try {
        let soluciones_pendientes = await solucionModel.solucionesPendientes()
        res.json({status : 'ok', data : soluciones_pendientes})
    } catch(error) {console.log(error); 
        res.status(500).json({status : 'error'})    }
})

module.exports = router;