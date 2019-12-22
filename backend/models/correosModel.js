const nodemailer = require('nodemailer');
const pool = require('../bd.js');


/*async function getAdminEmail(id) {
    try {
        let query = "select mail_cliente, password_mail_cliente, nombre_cliente from usuarios where estado_cliente = 1 and id_usuario = ?";
        const rows = await pool.query(query,[id]);
        return rows;
    } catch(error) {
        throw error;
    }
}*/

async function sendGenericEmail(obj) {
    try {
       // let get_email_config = await getAdminEmail(obj.id_cliente_usuario);

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "gyupanquisalvatierra@gmail.com" , //get_email_config[0].mail_cliente, // generated ethereal user
                pass: "belafu1998"//get_email_config[0].password_mail_cliente // generated ethereal password
            },
            tls : {//Por default esta en true,nesecario cambiarlo a false | si no, no te llega el correo
                rejectUnauthorized : false //certificado de seguridad
            }
        });
        console.log(transporter)
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: "gyupanquisalvatierra@gmail.com", // el que te envia el mail
            to: obj.mail_usuario, // list of receivers
            subject: 'Registro exitoso', // Subject line
            text: 'Hola, gracias por registrarte...' // plain text body
        });
    
        console.log(info.messageId);
        return info.messageId;
    } catch (error) {
        throw error; 
    }

}

module.exports = {sendGenericEmail} 