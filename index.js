import express from "express"; 
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "./src/modules/ferreteria.js";  // Importa la conexión de Mongoose

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Puerto de la aplicación
const port = process.env.PORT || 3000;

// Escuchar eventos de conexión
mongoose.connection.on('connected', () => {
  console.log('Base de datos conectada');

  // Iniciar el servidor
  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
});

mongoose.connection.on('error', (error) => {
  console.error(`Error al conectar con la base de datos: ${error}`);
});