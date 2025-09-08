const express = require('express');
const router = express.Router();
const reclamosModel = require('../../models/reclamosModel');

router.get('/modificar/:id', async (req, res, next) => {
  const id = req.params.id;
  console.log('GET /modificar/:id → ID recibido:', id); // 👈 Verificamos el ID recibido

  try {
    const reclamo = await reclamosModel.getReclamoById(id);
    console.log('Reclamo obtenido:', reclamo); // 👈 Verificamos los datos traídos de la DB

    res.render('admin/modificar', {
      layout: 'admin/layout',
      reclamo
    });
  } catch (error) {
    console.error('Error al obtener el reclamo:', error); // 👈 Mostramos el error completo
    res.redirect('/admin/reclamos');
  }
});

router.post('/modificar', async (req, res, next) => {
  const { id, estado } = req.body;
  console.log('POST /modificar → Datos recibidos:', { id, estado }); // 👈 Verificamos lo que llega del formulario

  try {
    if (id && estado) {
      const resultado = await reclamosModel.modificarReclamoById({ estado }, id);
      console.log('Resultado de la modificación:', resultado); // 👈 Verificamos qué devuelve el modelo

      res.redirect('/admin/inicio');
    } else {
      console.warn('Faltan datos para modificar:', { id, estado }); // 👈 Avisamos si falta algo

      res.render('admin/modificar', {
        layout: 'admin/layout',
        error: true,
        reclamo: { id, estado },
        mensaje: 'El ID y el estado son obligatorios'
      });
    }
  } catch (error) {
    console.error('Error al modificar el reclamo:', error); // 👈 Mostramos el error completo
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true,
      mensaje: 'No se pudo modificar el estado del reclamo'
    });
  }
});

module.exports = router;
