const pool = require('./bd');

function getVecino(email, password) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id, email, nombre FROM vecinos WHERE email = ? AND password = ?';
    pool.query(query, [email, password], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
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




module.exports = { getVecino, registrarVecino };