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
    const estadoFiltro = req.query.estado || null;
    const tipoFiltro = req.query.tipo || null;
    const fechaFiltro = req.query.fecha || null;
    const busquedaTexto = req.query.busqueda || null;
    const page = parseInt(req.query.page) || 1;
    const limit = 3;
    const offset = (page - 1) * limit;

    console.log('Estado recibido:', estadoFiltro);
    console.log('Tipo recibido:', tipoFiltro);
    console.log('Fecha recibida:', fechaFiltro);
    console.log('Texto buscado:', busquedaTexto);
    console.log('Página actual:', page);

    const total = await reclamosModel.contarReclamos(estadoFiltro, tipoFiltro, fechaFiltro, busquedaTexto);
    const reclamos = await reclamosModel.getReclamosPaginados(estadoFiltro, tipoFiltro, fechaFiltro, busquedaTexto, limit, offset);
    const totalPages = Math.ceil(total / limit);

    const reclamosFormateados = reclamos.map(reclamo => ({
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
      reclamos: reclamosFormateados,
      estadoSeleccionado: estadoFiltro,
      tipoSeleccionado: tipoFiltro,
      fechaSeleccionada: fechaFiltro,
      busquedaTexto,
      currentPage: page,
      totalPages
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
