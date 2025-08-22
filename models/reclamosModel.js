var pool = require('./bd');

async function getReclamos(){
    var query ='select * from reclamos';
    var rows = await pool.query(query);
    return rows;
}

async function getReclamoById(id) {
    var query = 'select * from s where id=?';
    var rows = await pool.query(query, [parseInt(id)]); 
    return rows[0];
}

async function insertReclamos(obj){
    try{
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


async function modificarReclamosById(obj, id){
    try {
        var query = 'update reclamos set ? where id=?';
        var rows = await pool.query (query, [obj, id]);
        return rows;
    } catch (error){
        throw error;
    }
    
}


module.exports = {getReclamos, insertReclamos, deleteReclamosById, getReclamoById, modificarReclamosById}
