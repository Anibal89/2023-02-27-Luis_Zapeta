import { config } from "dotenv";

config();   // Datos de conexion a la base de datos desde arcchivo de configuracion .env 

export default {
    host: process.env.DB_HOST || "localhost",
    database:process.env.DB_DATABASE || "sucursal",
    user:process.env.DB_USER || "anibal",
    password: process.env.DB_PASSWORD || "ReactJs100",
    port: process.env.DB_PORT || "3306"
};

