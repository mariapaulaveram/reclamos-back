const express = require('express');
const router = express.Router();
const multer = require('multer');
const reclamosController = require('../controllers/reclamosController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('imagen'), reclamosController.crearReclamo);

module.exports = router;

