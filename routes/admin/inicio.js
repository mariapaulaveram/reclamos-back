const express = require('express');
const router = express.Router();

const usuariosModel = require('../../models/usuariosModel');
const reclamosModel = require('../../models/reclamosModel'); // 
const util = require('util');
const cloudinary = require('cloudinary').v2;

const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

// Middleware para validar sesión
function secured(req, res, next) {
  if (req.session && req.session.id_usuario) {
    next();
  } else {
    res.redirect('/admin/login');
  }
}

// Ruta protegida y funcional
router.get('/', secured, async function(req, res, next) {
  try {
    let reclamos = await reclamosModel.getReclamos();

    reclamos = reclamos.map(reclamo => {
      if (reclamo.img_id) {
        const imagen = cloudinary.image(reclamo.img_id, {
          width: 70,
          height: 70,
          crop: 'fill'
        });
        return {
          ...reclamo,
          imagen
        };
      } else {
        return {
          ...reclamo,
          imagen: ''
        };
      }
    });

    res.render('admin/inicio', {
      layout: 'admin/layout',
      usuario: req.session.nombre,
      reclamos // pasás los reclamos a la vista
    });

  } catch (error) {
    console.error('Error al obtener los reclamos:', error);
    res.render('admin/inicio', {
      layout: 'admin/layout',
      usuario: req.session.nombre,
      reclamos: [],
      error: 'No se pudieron cargar los reclamos'
    });
  }
});

module.exports = router;

