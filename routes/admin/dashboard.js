const express = require('express');
const router = express.Router();
const reclamosModel = require('../../models/reclamosModel');

// Middleware para validar sesión
function secured(req, res, next) {
  if (req.session && req.session.id_usuario) {
    next();
  } else {
    res.redirect('/admin/login');
  }
}


router.get('/', secured, async (req, res) => {
  const reclamosPorTipo = await reclamosModel.contarPorTipo();
  const reclamosPorEstado = await reclamosModel.contarPorEstado();

  res.render('admin/dashboard', {
  layout: 'admin/layout',
  usuario: req.session.nombre,
  reclamosPorTipo,
  reclamosPorEstado,
  datosTipo: JSON.stringify(reclamosPorTipo),
  datosEstado: JSON.stringify(reclamosPorEstado)
});
});





module.exports = router;