import express from "express"; 
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import mongoose from "./src/modules/ferreteria.js";  // Importa la conexión de Mongoose
import user from "./src/routes/user.js";
import Carshop from "./src/routes/carshop.js";
import Categories from "./src/routes/categories.js";
import Order from "./src/routes/order.js";
import product from "./src/routes/product.js";

import { fileURLToPath } from 'url';




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
    origin: 'http://localhost:5173', // Especifico la direccion de origen de la peticion
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Indico que peticiones http se van usar
    allowedHeaders: ['Content-Type', 'Authorization'] // Autoriza a los headers
};

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config()

app.use(user)
app.use(Categories)
app.use(Carshop)
app.use(Order)
app.use(product)

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