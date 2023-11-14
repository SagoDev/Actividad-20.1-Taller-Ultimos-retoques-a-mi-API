const mysql = require('mysql2');


function conectar(){
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '96021919',
        database: 'bd_actividad_20.1'
      });
      return connection;
}

module.exports ={conectar};