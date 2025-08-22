const express = require('express');
const router = express.Router();

// Middleware para validar sesión
function secured(req, res, next) {
  if (req.session && req.session.id_usuario) {
    next();
  } else {
    res.redirect('/admin/login');
  }
}

// Ruta protegida
router.get('/', secured, function(req, res, next) {
  res.render('admin/inicio', {
    layout: 'admin/layout',
    usuario: req.session.nombre // para mostrar el nombre en la vista
  });
});

module.exports = router;
