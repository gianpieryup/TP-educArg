const pool = require('../bd');

async function solucionesCompradas(id_user) {
    try{
        let query = "SELECT id_posts FROM soluciones_compradas where id_usuario = ?";
        const rows = await pool.query(query,id_user);
        console.log(rows);
        
        return rows;
    } catch(error) {
        console.log("Error en el modelo solucionesModel/solucionesCompradas()");
        throw error;
    }
}

module.exports = {solucionesCompradas}