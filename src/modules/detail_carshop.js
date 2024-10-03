import mongoose from "./ferreteria.js";


const detailCarshopSchema = new mongoose.Schema({
  id_detail_carshop: {
    type: Number,
    required: true,
    unique: true,
    autoIncrement: true // Si necesitas auto-incremento, puedes usar mongoose-sequence.
  },
  amount: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
}, {
  timestamps: false, // Desactiva las marcas de tiempo
  collection: 'detail_carshop' // Nombre de la colección en MongoDB
});

// Relación con carshop
detailCarshopSchema.virtual('carshop', {
  ref: 'Carshop', // Nombre del modelo carshop
  localField: 'carshopId', // Campo local que referencia a carshop
  foreignField: '_id', // Campo en carshop
});

// Relación con product
detailCarshopSchema.virtual('product', {
  ref: 'Product', // Nombre del modelo product
  localField: 'productId', // Campo local que referencia a product
  foreignField: '_id', // Campo en product
});

const DetailCarshop = mongoose.model('DetailCarshop', detailCarshopSchema);

export default DetailCarshop;