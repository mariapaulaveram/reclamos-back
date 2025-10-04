var pool = require('./bd');


async function getReclamos() {
  var query = `
    SELECT * FROM reclamos
    ORDER BY FIELD(estado, 'Nuevo', 'Cargado', 'En proceso', 'En revision','Resuelto', 'Cerrado')
  `;
  var rows = await pool.query(query);
  return rows;
}


async function getReclamosPorEstado(estado) {
  try {
    const rows = await pool.query('SELECT * FROM reclamos WHERE estado = ?', [estado]);
    return rows;

  } catch (error) {
    throw error;
  }
}

async function getReclamosPaginados(estado, tipo, fecha, busqueda, limit, offset) {
  limit = parseInt(limit) || 3;
  offset = parseInt(offset) || 0;

  let query = 'SELECT * FROM reclamos WHERE 1=1';
  let params = [];

  if (estado) {
    query += ' AND estado = ?';
    params.push(estado);
  }

  if (tipo && typeof tipo === 'string') {
    query += ' AND tipo = ?';
    params.push(tipo);
  }

  if (fecha) {
    query += ' AND DATE(fecha) = ?';
    params.push(fecha);
  }

  if (busqueda && typeof busqueda === 'string') {
    query += ` AND (
      nombre LIKE ? OR
      apellido LIKE ? OR
      email LIKE ? OR
      descripcion LIKE ?
    )`;
    const like = `%${busqueda}%`;
    params.push(like, like, like, like);
  }

  query += ' ORDER BY fecha DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);

  try {
    const rows = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.error('Error en getReclamosPaginados:', error);
    throw error;
  }
}


async function getReclamoById(id) {
    var query = 'select * from reclamos where id=?';
    var rows = await pool.query(query, [parseInt(id)]); 
    return rows[0];
}

async function insertReclamos(obj){
    try{
        obj.estado = 'cargado'; // 👈 valor por defecto
        var query = "insert into reclamos set?";
        var rows = await pool.query(query, [obj])
        return rows;
    } catch (error){
        console.log(error);
        throw error;
    }
}

async function deleteReclamosById(id) {
    var query = 'delete from reclamos where id=?';
    var rows = await pool.query(query, [id]);
    return rows;
}


async function modificarReclamoById(obj, id){
  try {
    const query = 'UPDATE reclamos SET ? WHERE id = ?';
    const result = await pool.query(query, [obj, id]);


    if (result.affectedRows === 0) {
      throw new Error('No se encontró el reclamo para modificar');
    }

    return result;
  } catch (error){
    console.error('Error en modificarReclamosById:', error);
    throw error;
  }
}

async function contarPorTipo() {
  const rows = await pool.query('SELECT tipo, COUNT(*) as cantidad FROM reclamos GROUP BY tipo');
  return rows;

}

async function contarPorEstado() {
  const rows = await pool.query('SELECT estado, COUNT(*) as cantidad FROM reclamos GROUP BY estado');
  return rows;

}

async function contarReclamos(estado, tipo, fecha, busqueda) {
  let query = 'SELECT COUNT(*) AS total FROM reclamos WHERE 1=1';
  let params = [];

  if (estado) {
    query += ' AND estado = ?';
    params.push(estado);
  }

  if (tipo) {
    query += ' AND tipo = ?';
    params.push(tipo);
  }

  if (fecha) {
    query += ' AND DATE(fecha) = ?';
    params.push(fecha);
  }

  if (busqueda && typeof busqueda === 'string') {
    query += ` AND (
      nombre LIKE ? OR
      apellido LIKE ? OR
      email LIKE ? OR
      descripcion LIKE ?
    )`;
    const like = `%${busqueda}%`;
    params.push(like, like, like, like);
  }

  const [result] = await pool.query(query, params);
  return result.total;
}


module.exports = {getReclamos, getReclamosPorEstado ,insertReclamos, getReclamosPaginados, contarReclamos,deleteReclamosById, getReclamoById, modificarReclamoById, contarPorTipo, contarPorEstado}
