const pool = require('./../bd.js');
const uuid = require('uuid');
const mp = require('../mercadoPago')

//LO QUE SI ME SIRVE ES LO DE MERCADO PAGO Y DE UPDATEAR LOS SALVAVIDAS DE LOS USUARIOS

async function comprar(idUsuario,idPots) {
    try {
        let uuid_t = uuid();

        let queryInsert = "insert into soluciones_compradas set ?";
        let obj = {
            id_usuario: idUsuario,
            id_posts: idPots,
            token_compra: uuid_t
            }  
        const rowsInsert = await pool.query(queryInsert,obj);

        let queryCorreo = "select mail_usuario from usuarios where id_usuario = ? ";
        var correoDelUsuario = await pool.query(queryCorreo,idUsuario);
        // {mail_usuario : 'x'}
        correoDelUsuario = correoDelUsuario[0].mail_usuario;
        console.log(correoDelUsuario)

    //-------------------------------------------------
    let insertId = rowsInsert.insertId
    console.log(rowsInsert.insertId);//la pk de la fila insertada
  
    //mercado PAgo
    //[items] es un array de objetos que contienen todos los datos referidos a la compra
    let preference ={
        items : [
            {
                id : rowsInsert.insertId,
                title : 'Compra e-commerce',
                quantity : 1, //lo que elija el usuario  req.body.cant
                currency_id : 'ARS',
                unit_price: 100 //lo que elija el usuario  req.body.price
            }
        ],
        payer :{
            email :  correoDelUsuario  
        },
        notification_url : 'http://unaurldeverdad.com.ar:3000/' + "compra/"+ uuid_t
    }
        //notification_url es la url a la que mercado pago me redirige si la compra fue exitosa

    let obj_mercadopago = await mp.comprar(preference);
    console.log(obj_mercadopago)
    console.log(preference.notification_url);
    
    return obj_mercadopago.body.sandbo_init_point;
    } catch (error) {
        throw error;
    }
   
    
}

module.exports = {comprar} 