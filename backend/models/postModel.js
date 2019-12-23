const pool = require('../bd');


//Funcion multiproposito
// 0: pendiente, 1 = confirmado , 2 rechazado 
// ISUSS : agregar un campo opcional que sea el curso: matematica /fisica
async function getAllPost(estado) {
    try{
        let query = "SELECT id_post ,u.nombre_usuario, enunciado_ejercicio , likes , dislikes, fecha_post FROM posts p JOIN usuarios u on (p.id_usuario = u.id_usuario) where estado = ?";
        const rows = await pool.query(query,estado);
        console.log(rows);
        
        return rows;
    } catch(error) {
        console.log("Error en el modelo postModel/getAllPost()");
        throw error;
    }
}

async function getPost(idpost) {
    try{
        let query = "SELECT u.nombre_usuario, enunciado_ejercicio,solucion , likes , dislikes, fecha_post FROM posts p JOIN usuarios u on (p.id_usuario = u.id_usuario) where id_post = ?";
        const rows = await pool.query(query,idpost);
        console.log(rows);
        
        return rows;
    } catch(error) {
        console.log("Error en el modelo postModel/getPost()");
        throw error;
    }
}

async function insertPost(obj) {
    try{
        console.log("Ingresa al model postModel > innsertPost");
        let query = "INSERT INTO ?? set ?";

        const rows = await pool.query(query,[process.env.TABLA_POST,obj]);
        console.log("Cargo en la bd",rows.insertId);
        return rows.insertId;
    } catch(error) {
        throw error;
    }
}

//Lo unico que se puede modificar de un post es el estado y se restringe para el admin
async function updatePost(estado,id) {
    try{
        let query = "UPDATE ?? set estado = ? where id_post = ?";        
        const rows = await pool.query(query,[process.env.TABLA_POST,estado,id]);

    } catch(error) {
        throw error;
    }
}

module.exports = {getAllPost,getPost,insertPost,updatePost}