var pool = require('./bd');

/*async function getReclamos(){
    var query ='select * from reclamos';
    var rows = await pool.query(query);
    return rows;
}*/

/*async function getReclamos() {
  var query = 'SELECT * FROM reclamos ORDER BY estado';
  var rows = await pool.query(query);
  return rows;
}*/

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

async function getReclamosPaginados(estado, limit, offset) {
  let query = 'SELECT * FROM reclamos';
  let params = [];

  if (estado) {
    query += ' WHERE estado = ?';
    params.push(estado);
  }

  query += ' ORDER BY fecha DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);

  const rows = await pool.query(query, params);
  return rows;
}

async function contarReclamos(estado) {
  let query = 'SELECT COUNT(*) AS total FROM reclamos';
  let params = [];

  if (estado) {
    query += ' WHERE estado = ?';
    params.push(estado);
  }

  const [result] = await pool.query(query, params);
  return result.total;
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

module.exports = {getReclamos, getReclamosPorEstado ,insertReclamos, getReclamosPaginados, contarReclamos,deleteReclamosById, getReclamoById, modificarReclamoById, contarPorTipo, contarPorEstado}
