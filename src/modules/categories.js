import mongoose from "./ferreteria.js";

const categorySchema = new mongoose.Schema({
  id_category: {
    type: Number,
    required: true,
    unique: true,
    autoIncrement: true // Mongoose no soporta autoIncrement nativamente, pero podrías implementar una estrategia para generar IDs únicos.
  },
  name_category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  }
}, {
  timestamps: false, // Desactiva las marcas de tiempo
  collection: 'categories' // Define el nombre de la colección
});

// Relación con productos
categorySchema.virtual('products', {
  ref: 'Product', // Nombre del modelo relacionado
  localField: '_id', // Campo local
  foreignField: 'categoryId', // Campo en el modelo Product que hace referencia
});

const Category = mongoose.model('Category', categorySchema);

export default Category;