import mongoose from "./ferreteria.js";

const productSchema = new mongoose.Schema({
  id_product: {
    type: Number,
    required: true,
    unique: true,
    autoIncrement: true // Si necesitas auto-incremento, puedes usar un plugin como mongoose-sequence.
  },
  name_product: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['inactive', 'active'], // Equivalente al ENUM de Sequelize
    required: true,
  },
  image_url: {
    type: String,
  },
}, {
  timestamps: false, // Desactiva las marcas de tiempo
  collection: 'products' // Nombre de la colección
});

// Relaciones con detail_carshop y detail_order
productSchema.virtual('detail_carshops', {
  ref: 'DetailCarshop', // Modelo relacionado
  localField: '_id', // Campo local en products
  foreignField: 'productId', // Campo en DetailCarshop que hace referencia
});

productSchema.virtual('detail_orders', {
  ref: 'DetailOrder', // Modelo relacionado
  localField: '_id', // Campo local en products
  foreignField: 'productId', // Campo en DetailOrder que hace referencia
});

// Relación con categories
productSchema.virtual('category', {
  ref: 'Category', // Nombre del modelo de categorías
  localField: 'categoryId', // Campo local en el producto que hace referencia a la categoría
  foreignField: '_id', // Campo en la categoría
});

const Product = mongoose.model('Product', productSchema);

export default Product;
