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
      res.status(200).json({ message: 'Login successful', alumno: result[0] });
    }
    else {
      res.status(401).json({ message: 'Login failed. Invalid username or password.' });
    }
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
});


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





module.exports = router;

