import mongoose from './ferreteria.js';


const orderSchema = new mongoose.Schema({
  id_order: {
    type: Number,
    required: true,
    unique: true,
    autoIncrement: true, // Si necesitas auto-incremento, puedes usar un plugin como mongoose-sequence.
  },
  date_order: {
    type: Date,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['in progress', 'sended', 'delivered', 'cancelled', 'on hold'], // Equivalente al ENUM de Sequelize
    default: 'in progress',
  },
}, {
  timestamps: false, // Desactiva las marcas de tiempo
  collection: 'orders', // Nombre de la colección en MongoDB
});

// Relaciones con detail_order, pay y send
orderSchema.virtual('detail_orders', {
  ref: 'DetailOrder', // Nombre del modelo detail_order
  localField: '_id', // Campo local en orders
  foreignField: 'orderId', // Campo en DetailOrder que hace referencia
});

orderSchema.virtual('pay', {
  ref: 'Pay', // Nombre del modelo pay
  localField: '_id', // Campo local en orders
  foreignField: 'orderId', // Campo en Pay que hace referencia
});

orderSchema.virtual('send', {
  ref: 'Send', // Nombre del modelo send
  localField: '_id', // Campo local en orders
  foreignField: 'orderId', // Campo en Send que hace referencia
});

// Relación con users
orderSchema.virtual('user', {
  ref: 'User', // Nombre del modelo users
  localField: 'userId', // Campo local que referencia a users
  foreignField: '_id', // Campo en User
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
