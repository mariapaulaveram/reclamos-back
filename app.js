var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload');
var cors = require('cors');

require('dotenv').config();

var session = require('express-session');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var reclamosRouter = require('./routes/reclamos'); // 👈 Nuevo router viene del front...
var loginRouter = require('./routes/admin/login');
var inicioRouter = require('./routes/admin/inicio');
var apiRouter = require('./routes/api');
var vecinosRouter = require('./routes/vecinos.js');
var adminReclamosRouter = require('./routes/admin/admin-reclamos');
var verReclamosRouter = require('./routes/admin/verReclamos');
const verEncuestaRouter = require('./routes/admin/verEncuesta');

var app = express();

app.use(express.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Middlewares
app.use(logger('dev'));
app.use(cors()); // 👈 Permite peticiones desde el frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 👈 Necesario para form-data
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const hbs = require('hbs');

hbs.registerHelper('ifCond', function (v1, operator, v2, options) {
  switch (operator) {
    case '==': return (v1 == v2) ? options.fn(this) : options.inverse(this);
    case '!=': return (v1 != v2) ? options.fn(this) : options.inverse(this);
    case '>': return (v1 > v2) ? options.fn(this) : options.inverse(this);
    case '<': return (v1 < v2) ? options.fn(this) : options.inverse(this);
    default: return options.inverse(this);
  }
});


app.use(session({
  secret: 'azzertotaucrot',
  cookie:{maxAge: null },
  resave:false,
  saveUninitialized:true
}))

secured = async(req,res, next) => {
  try{
    console.log(req.session.id_usuario);
    if(req.session.id_usuario){
      next();
    } else{
      res.redirect('/admin/login');
    }
  }catch (error){
    console.log(error);
  }
}

// Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reclamos', reclamosRouter); // 👈 Ruta para el formulario
app.use('/admin/login', loginRouter);
app.use('/admin/inicio', inicioRouter);
app.use('/api', apiRouter);
app.use('/api', vecinosRouter);
app.use('/admin/admin-reclamos', adminReclamosRouter);
app.use('/admin/verReclamos', verReclamosRouter);
app.use('/admin/verEncuesta', verEncuestaRouter);

app.use(express.static('public'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

