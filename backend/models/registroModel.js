const pool = require('../bd');
const correosModel = require('./correosModel');
async function registrar(obj){
    try {
        let query = "insert into ?? set ?";
        const rows = await pool.query(query,[process.env.TABLA_USUARIOS,obj]);
		console.log("Resultado del insert",rows)
        if(rows.insertId !=undefined) {
            let id_correo = await correosModel.sendGenericEmail(obj);
            if(id_correo) {
                return true;//si se envio el correo Correctamente
            } else {
                return false; //si hubo error

            }
        } 

    } catch (error) {
        throw error; 
    }
}

module.exports = {registrar}