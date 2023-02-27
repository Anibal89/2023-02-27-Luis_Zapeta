import mysql from "promise-mysql";
import config from "./../config";

// Metodo de Conexion a la base de datos

const connection = mysql.createConnection({ 
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password,
    port: config.port
});


const getConnection= () =>{
    return connection;
};

module.exports = {
    getConnection,
}; 
