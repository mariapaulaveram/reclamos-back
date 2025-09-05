const pool = require('../models/bd');
const express = require('express');
const router = express.Router();
const vecinosModel = require('../models/vecinosModel');


// Ruta para login de vecinos
router.post('/vecinos', async (req, res) => {
  const { email, password } = req.body;
  console.log('Datos recibidos:', req.body);


  try {
    const result = await vecinosModel.getVecino(email, password);

    if (result.length > 0) {
      console.log("Vecino encontrado:", result[0]); // 👈 Verifico que tenga el campo 'id'
      res.status(200).json({ message: 'Login successful', vecino: result[0] });
    }
    else {
      res.status(401).json({ message: 'Login failed. Invalid username or password.' });
    }
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

/*Para registro de vecinos */
router.post('/vecinos/registro', async (req, res) => {
  const { nombre, apellido, email, password } = req.body;
  console.log('Datos de registro recibidos:', req.body);

  try {
    const nuevoVecino = await vecinosModel.registrarVecino(nombre, apellido, email, password);
    console.log('Vecino registrado:', nuevoVecino);
    res.status(201).json({ message: 'Registro exitoso', vecino: nuevoVecino });
  } catch (error) {
    if (error.message === 'El email ya está registrado') {
      res.status(409).json({ message: error.message }); // 409 = conflicto
    } else {
      console.error('Error al registrar vecino:', error);
      res.status(500).json({ message: 'Error en el servidor al registrar vecino' });
    }
  }
});

/*para ver reclamos del vecino */
router.get('/vecinos/reclamos', async (req, res) => {
  const vecino_id = parseInt(req.query.vecino_id);
  console.log("📩 Id recibido en reclamos:", req.query.vecino_id);

  if (isNaN(vecino_id) || vecino_id <= 0) {
  return res.status(400).json({ message: "Id inválido" });
}


  try {
    console.log("📩 Id recibido en reclamos:", vecino_id);

    const vecino = await vecinosModel.getVecinoPorId(vecino_id);
    console.log("🔍 Resultado de getVecinoPorId:", vecino);

    if (!vecino || !vecino.id) {
      console.warn("⚠️ Vecino no encontrado con id:", vecino_id);
      return res.status(404).json({ message: 'Vecino no encontrado' });
    }  

    const reclamos = await vecinosModel.getReclamosPorVecinoId(vecino.id);
    console.log(`📦 Reclamos encontrados para vecino ${vecino.id}:`, reclamos.length);
    res.status(200).json(reclamos);
  } catch (error) {
    console.error('❌ Error al obtener los reclamos:', error);
    res.status(500).json({ message: 'Error en el servidor al obtener reclamos' });
  }
});



module.exports = router;

