import mongoose from "./ferreteria.js";

const carshopSchema = new mongoose.Schema({
  date_creation: {
    type: Date,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
}, {
  timestamps: false,
  collection: 'carshop',
});

// Asociaciones
carshopSchema.statics.associate = (models) => {
  carshopSchema.virtual('user', {
    ref: 'users', // Nombre del modelo relacionado
    localField: '_id', // Campo local
    foreignField: 'carshopId', // Campo en el modelo relacionado
  });

  carshopSchema.virtual('details', {
    ref: 'detail_carshop', // Nombre del modelo relacionado
    localField: '_id', // Campo local
    foreignField: 'carshopId', // Campo en el modelo relacionado
  });
};

const Carshop = mongoose.model('Carshop', carshopSchema);

export default Carshop;