//integra con el front para subir los reclamos a la bd
const pool = require('../models/bd');
const { subirImagen } = require('../services/cloudinaryService');

exports.crearReclamo = async (req, res) => {
  const { nombre, email, tipo, descripcion } = req.body;
  const archivo = req.file;
  let imagenUrl = null;

  // Log inicial para depuración
  console.log('Datos recibidos:', { nombre, email, tipo, descripcion });
  console.log('Archivo recibido:', archivo ? archivo.originalname : 'Sin imagen');

  // Validación básica
  if (!nombre || !email || !tipo || !descripcion) {
    console.warn('❌ Campos obligatorios faltantes');
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    // Subida de imagen si existe
    if (archivo) {
      imagenUrl = await subirImagen(archivo);
      console.log('✅ Imagen subida a Cloudinary:', imagenUrl);
    }

    // Query condicional según si hay imagen
    let query, valores;

    if (imagenUrl) {
      query = `
        INSERT INTO reclamos (nombre, email, tipo, descripcion, imagen_url)
        VALUES (?, ?, ?, ?, ?)
      `;
      valores = [nombre, email, tipo, descripcion, imagenUrl];
    } else {
      query = `
        INSERT INTO reclamos (nombre, email, tipo, descripcion)
        VALUES (?, ?, ?, ?)
      `;
      valores = [nombre, email, tipo, descripcion];
    }

    await pool.query(query, valores);
    console.log('✅ Reclamo guardado en la base de datos');

    res.status(201).json({ mensaje: 'Reclamo guardado correctamente' });
  } catch (error) {
    console.error('❌ Error al guardar reclamo:', error.message);
    console.error('🧠 Stack:', error.stack);
    res.status(500).json({ error: 'Error interno del servidor. Revisar logs.' });
  }
};


