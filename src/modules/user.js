import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id_user: {
    type: Number,
    required: false,
    unique: true,
    autoIncrement: true, // Si necesitas auto-incremento, puedes usar mongoose-sequence.
  },
  name_user: {
    type: String,
    required: true,
  },
  email_user: {
    type: String,
    required: true,
    unique: true,
  },
  password_user: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  rol: {
    type: String,
    enum: ['client', 'admin'], // Equivalente al ENUM de Sequelize
    default: 'client',
  },
}, {
  timestamps: false, // Desactiva las marcas de tiempo
  collection: 'users' // Nombre de la colección en MongoDB
});

// Relaciones con review, orders y carshop
userSchema.virtual('reviews', {
  ref: 'Review', // Nombre del modelo review
  localField: '_id', // Campo local en users
  foreignField: 'userId', // Campo en Review que hace referencia
});

userSchema.virtual('orders', {
  ref: 'Order', // Nombre del modelo orders
  localField: '_id', // Campo local en users
  foreignField: 'userId', // Campo en Order que hace referencia
});

userSchema.virtual('carshop', {
  ref: 'Carshop', // Nombre del modelo carshop
  localField: '_id', // Campo local en users
  foreignField: 'userId', // Campo en Carshop que hace referencia
});

const User = mongoose.model('User', userSchema);

export default User;
