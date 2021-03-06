const pool = require('../bd');

async function cargarSolucion(obj) {
    try{
        console.log("Linea 18 solucionesmodel.js");
        let query = "INSERT INTO soluciones_usuario set  ?";
        const rows = await pool.query(query,obj);
        console.log("Resultado del INSERT: ",rows);
        
        return rows;
    } catch(error) {
        console.log("Error en el modelo solucionesModel/cargarSolucion()");
        throw error;
    }
}

async function solucionesCompradas(id_user) {
    try{
        let query = "SELECT id_posts FROM soluciones_compradas WHERE id_usuario = ?";
        const rows = await pool.query(query,id_user);
        console.log(rows);
        
        return rows;
    } catch(error) {
        console.log("Error en el modelo solucionesModel/solucionesCompradas()");
        throw error;
    }
}

//Probar pendiente
async function postsRespondidos(id_user) {
    try{
        let query = "SELECT * FROM soluciones_usuario WHERE id_user_solucion = ?";
        const rows = await pool.query(query,id_user);
        console.log(rows);
        
        return rows;
    } catch(error) {
        console.log("Error en el modelo solucionesModel/postsRespondidos()");
        throw error;
    }
}

//FUNCIONALIDADES solo del ADMIN --------------------------------------------------
//Actualizar Solucion--------------------------------------------------------------
async function updateSolucion(obj,user_solucion,post){
    try{
        let query = "UPDATE soluciones_usuario SET ?  WHERE id_user_solucion = ? && id_post = ?";
        const rows = await pool.query(query,[obj,user_solucion,post]);
        console.log(rows);
        
        return rows;
    } catch(error) {
        console.log("Error en el modelo solucionesModel/updateSolucion()");
        throw error;
    }
}

async function solucionesPendientes(){
    try{
        let query = "SELECT * FROM soluciones_usuario WHERE estado = 0";
        const rows = await pool.query(query);
        console.log(rows);
        
        return rows;
    } catch(error) {
        console.log("Error en el modelo solucionesModel/solucionesPendientes()");
        throw error;
    }
}


module.exports = {solucionesCompradas,cargarSolucion,postsRespondidos,updateSolucion,solucionesPendientes}