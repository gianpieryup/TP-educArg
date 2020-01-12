const pool = require('../bd');
const md5 = require('md5');

async function getUsuario(id) {
    try {
        console.log("Entro a get usuario");
        
        let query = "select nombre_usuario, telefono_usuario, mail_usuario, salvavidas from ?? where id_usuario = ?";
        const rows = await pool.query(query,[process.env.TABLA_USUARIOS,id]);
        console.log("lo que devuelve",rows);
        return rows; 
    } catch (error) {
        throw error;
    }
}

async function putUsuarioDatos(nombre,telefono, id) {
    try {

        let query = "update usuarios set nombre_usuario = ?, telefono_usuario = ? where id_usuario = ?";
        const rows = await pool.query(query,[nombre,telefono,id]);
        return rows;
    } catch(error) {
        throw error;
    }
}

async function putUsuarioPassword(password, id) {
    try{ 

        let query = "update usuarios set password_usuario = ? where id_usuario = ?";
        const rows = await pool.query(query,[md5(password),id])
        return rows;
    } catch(error) {
        throw error;
    }
}

async function putUsuarioSalvavidas(cant, id) {
    try{ 

        let query = "update usuarios set salvavidas = salvavidas + ? where id_usuario = ?";
        const rows = await pool.query(query,[cant,id])
        return rows;
    } catch(error) {
        throw error;
    }
}
module.exports = {getUsuario, putUsuarioDatos,putUsuarioPassword,putUsuarioSalvavidas}