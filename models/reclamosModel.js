var pool = require('./bd');

async function getReclamos(){
    var query ='select * from reclamos';
    var rows = await pool.query(query);
    return rows;
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



module.exports = {getReclamos, insertReclamos, deleteReclamosById, getReclamoById, modificarReclamoById}
