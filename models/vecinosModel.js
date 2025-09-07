const pool = require('./bd');

function getVecino(email, password) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id, email, nombre, apellido FROM vecinos WHERE email = ? AND password = ?';
    pool.query(query, [email, password], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function getVecinoPorId(id) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id, email, nombre, apellido FROM vecinos WHERE id = ?';
    console.log("🔍 Buscando vecino con id:", id);

    pool.query(query, [id], (err, result) => {
      if (err) {
        console.error("❌ Error en getVecinoPorId:", err);
        reject(err);
      } else {
        console.log("✅ Resultado de getVecinoPorId:", result);
        resolve(result[0]);
      }
    });
  });
}




function registrarVecino(nombre, apellido, email, password) {
  return new Promise((resolve, reject) => {
    const checkQuery = 'SELECT id FROM vecinos WHERE email = ?';
    pool.query(checkQuery, [email], (err, result) => {
      if (err) {
        return reject(err);
      }

      if (result.length > 0) {
        return reject(new Error('El email ya está registrado'));
      }

      const insertQuery = 'INSERT INTO vecinos (nombre, apellido, email, password) VALUES (?, ?, ?, ?)';
      pool.query(insertQuery, [nombre, apellido, email, password], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id: result.insertId, nombre, apellido, email });
        }
      });
    });
  });
}

function getReclamosPorVecinoId(vecino_id) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id, tipo, descripcion, direccion, imagen_url, fecha FROM reclamos WHERE vecino_id = ?';
    console.log("🔍 Buscando reclamos para vecino ID:", vecino_id);

    pool.query(query, [vecino_id], (err, result) => {
      if (err) {
        console.error("❌ Error en getReclamosPorVecinoId:", err);
        reject(err);
      } else {
        console.log("✅ Reclamos encontrados:", result.length);
        resolve(result);
      }
    });
  });
}




module.exports = { getVecino, getVecinoPorId, registrarVecino, getReclamosPorVecinoId };