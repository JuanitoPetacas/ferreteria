import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbURI = process.env.DB_URI;  // URL de la base de datos desde el .env

mongoose.connect(dbURI, {})
    .then(() => console.log("CONNECTED TO DATABASE SUCCESSFULLY"))
    .catch(error => console.error('COULD NOT CONNECT TO DATABASE:', error.message));

export default mongoose;
