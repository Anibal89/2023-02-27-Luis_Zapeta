import express from "express";
import morgan from "morgan";
import cors from 'cors'
import cookie from "cookie-parser";

//importacion de Rutas

import sucursales from './routes/sucursal.routes'

const app = express();

//configuraciones

app.set("port", 4000);

//Middlewares

app.use(morgan("dev"));
app.use(cookie());
app.use(express.json());

app.use(
  cors()
);

//Uso de Rutas para peticiones REST API 

app.use('/api/sucursal',sucursales);

//Configuracion - Validacion de Endpoind Incorrecto

app.use((req,res, next)=>{
  next(); 
  res.status(404).json({
      message: ' Endpoint No Encontrado'
  })
})

export default app;


