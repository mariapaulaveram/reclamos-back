//integra con el front para subir los reclamos a la bd

const pool = require('../models/bd');
const { subirImagen } = require('../services/cloudinaryService');

exports.crearReclamo = async (req, res) => {
  const { nombre, apellido, email, tipo, descripcion, direccion } = req.body;
  const vecino_id = req.body.vecino_id;
  const estado = 'Nuevo'; // 👈 valor por defecto
  const comentarios = 'Sin comentarios'; // 👈 valor por defecto

  const archivo = req.file;
  let imagenUrl = null;

  // Log inicial para depuración
  console.log('Datos recibidos:', { nombre, apellido, email, tipo, descripcion, direccion, vecino_id, estado, comentarios });

  console.log('Archivo recibido:', archivo ? archivo.originalname : 'Sin imagen');

  // Valor por defecto para estado
  const estadoFinal = estado || 'Nuevo';
  
  // Validación básica
  if (!nombre || !apellido || !email || !tipo || !descripcion || !direccion || !vecino_id || !estadoFinal || !comentarios) {
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
    INSERT INTO reclamos (nombre, apellido, email, tipo, descripcion, direccion, imagen_url, vecino_id, estado, comentarios)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  valores = [nombre, apellido, email, tipo, descripcion, direccion, imagenUrl, vecino_id, estado, comentarios];
} else {
  query = `
    INSERT INTO reclamos (nombre, apellido, email, tipo, descripcion, direccion, vecino_id, estado, comentarios)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  valores = [nombre, apellido, email, tipo, descripcion, direccion, vecino_id, estado, comentarios];
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


