var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const fs = require('fs');
const authRouter = require('./controllers/auth');
const registroRouter = require('./controllers/registro');
const usuariosRouter = require('./controllers/usuarios');
const postsRouter = require('./controllers/posts');
const compraRouter = require('./controllers/compra');

const uploadRouter = require('./controllers/upload');

// Admin controller
const postsAdminRouter = require('./controllers/admin/posts');
const usuariosAdminRouter = require('./controllers/admin/usuarios');
const solucionesAdminRouter = require('./controllers/admin/soluciones');

var app = express();
app.use(cors())
// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

secured = (req,res,next) => {
try {

  let token = req.headers.authorization; 

  token = token.replace('Bearer ','');
  const publicKey = fs.readFileSync('./claves/publica.pem');
  let decoded = jwt.verify(token, publicKey);

  req.id = decoded.id;
  req.role = decoded.role;
  next();
} catch (error) {
  res.status(401).json({status : 'unauthorized'});
}
}

securedAdmin = (req,res,next) => {
  try {
    let token = req.headers.authorization; 
    console.log(token);
    token = token.replace('Bearer ','');
    const publicKey = fs.readFileSync('./claves/publica.pem');
    var decodedAdmin = jwt.verify(token, publicKey);
    console.log(decodedAdmin);  
    req.id = decodedAdmin.id;
    req.role = decodedAdmin.role;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({status : 'unauthorized'});
  }
  }

// PATH
// this folders for this application will be used to store public file images
app.use('/uploads', express.static(path.resolve('uploads')));

// USER
app.use('/auth', authRouter);
app.use('/registro', registroRouter);
app.use('/usuarios', secured,usuariosRouter);
app.use('/posts',postsRouter);
app.use('/compra',secured,compraRouter);
app.use('/upload',secured, uploadRouter);//deberia ponenr el secured para aceder al id , pero me rompe lo del front | 	quite el secured

// ADMIN 
app.use('/admin/posts', securedAdmin, postsAdminRouter);
app.use('/admin/usuarios', securedAdmin, usuariosAdminRouter);
app.use('/admin/soluciones', securedAdmin, solucionesAdminRouter);


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);

});

module.exports = app ;
