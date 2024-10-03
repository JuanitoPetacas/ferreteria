import mongoose from './ferreteria.js';
import Carshop from './carshop.js';
import Category from './categories.js';

import DetailCarshop from './detail_carshop.js';
import Order from './order.js';
import Product from './products.js';
import User from './users.js';

// Crear un objeto que contenga todos los modelos
const models = {
  Carshop,
  Category,

  DetailCarshop,
  Order,

  Product,

  User,
  
};

// Aquí puedes definir las relaciones
// Nota: En Mongoose, las relaciones no se definen de la misma manera que en Sequelize.
// Sin embargo, puedes usar las propiedades virtuales en cada esquema para establecer relaciones.

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

// Exportar los modelos
export { models };
export default mongoose;
