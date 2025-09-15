const pool = require('./bd');

async function getEncuestas() {
  const query = 'SELECT * FROM encuesta ORDER BY fecha DESC';
  const rows = await pool.query(query);
  return rows;
}

async function contarEncuestas() {
  const [result] = await pool.query('SELECT COUNT(*) AS total FROM encuesta');
  return result.total;
}

async function getEncuestasPaginadas(limit, offset) {
  const rows = await pool.query('SELECT * FROM encuesta ORDER BY fecha DESC LIMIT ? OFFSET ?', [limit, offset]);
  return rows;
}


async function getEncuestaById(id) {
  const query = 'SELECT * FROM encuesta WHERE id = ?';
  const rows = await pool.query(query, [parseInt(id)]);
  return rows[0];
}

async function insertEncuesta(obj) {
  try {
    const query = 'INSERT INTO encuesta SET ?';
    const rows = await pool.query(query, [obj]);
    return rows;
  } catch (error) {
    console.error('Error al insertar encuesta:', error);
    throw error;
  }
}


async function getEncuestasByVecinoId(vecino_id) {
  const query = 'SELECT * FROM encuesta WHERE vecino_id = ? ORDER BY fecha DESC';
  const rows = await pool.query(query, [vecino_id]);
  return rows;
}

module.exports = {
  getEncuestas,
  contarEncuestas,
  getEncuestasPaginadas,
  getEncuestaById,
  insertEncuesta,
  getEncuestasByVecinoId
};
