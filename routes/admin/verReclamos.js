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

// Ruta para ver los reclamos
router.get('/', secured, async function(req, res, next) {
  try {
    let reclamos = await reclamosModel.getReclamos();

    reclamos = reclamos.map(reclamo => ({
      ...reclamo,
      fecha_formateada: new Date(reclamo.fecha).toLocaleString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      imagen: reclamo.imagen_url || ''
    }));

    res.render('admin/verReclamos', {
      layout: 'admin/layout',
      usuario: req.session.nombre,
      reclamos
    });

  } catch (error) {
    console.error('Error al obtener los reclamos:', error);
    res.render('admin/verReclamos', {
      layout: 'admin/layout',
      usuario: req.session.nombre,
      reclamos: [],
      error: 'No se pudieron cargar los reclamos'
    });
  }
});

module.exports = router;
