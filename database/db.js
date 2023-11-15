const mysql = require("mysql2");

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "96021919",
    database: "bd_actividad_20.1",
    connectionLimit: 5,
});

conexion.connect((err)=>{
    if(err){
        console.error(err);
        return;
    } else{
        console.log("Conectado a la BD.");
    }
});

module.exports = conexion;