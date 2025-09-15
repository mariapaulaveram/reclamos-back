const express = require('express');
const router = express.Router();

const encuestasModel = require('../../models/encuestasModel');

// Middleware para validar sesión
function secured(req, res, next) {
  if (req.session && req.session.id_usuario) {
    next();
  } else {
    res.redirect('/admin/login');
  }
}

// Ruta para ver las encuestas
router.get('/', secured, async function(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const total = await encuestasModel.contarEncuestas();
    const encuestas = await encuestasModel.getEncuestasPaginadas(limit, offset);
    const totalPages = Math.ceil(total / limit);

    const encuestasFormateadas = encuestas.map(encuesta => ({
      ...encuesta,
      fecha_formateada: new Date(encuesta.fecha).toLocaleString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }));

    res.render('admin/verEncuesta', {
      layout: 'admin/layout',
      usuario: req.session.nombre,
      encuestas: encuestasFormateadas,
      currentPage: page,
      totalPages
    });

  } catch (error) {
    console.error('Error al obtener encuestas:', error);
    res.render('admin/verEncuesta', {
      layout: 'admin/layout',
      usuario: req.session.nombre,
      encuestas: [],
      error: 'No se pudieron cargar las encuestas'
    });
  }
});


module.exports = router;
