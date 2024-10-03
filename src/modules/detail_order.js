import mongoose from "./ferreteria.js"; // Ajusta la ruta según tu estructura


const detailOrderSchema = new mongoose.Schema({
    id_detail_order: {
        type: Number,
        required: false,
        unique: true,
        autoIncrement: true,
        // El auto-incremento se gestionará con el plugin
    },
    name_product: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price_product: {
        type: Number,
        required: true,
    },
    quantity_product: {
        type: Number,
        required: true,
        default: 1,
        min: [1, 'Quantity must be at least 1'], // Mensaje de error personalizado
    },
}, {
    timestamps: false, // Desactiva las marcas de tiempo
    collection: 'detail_order' // Nombre de la colección en MongoDB
});

// Relación con order
detailOrderSchema.virtual('order', {
    ref: 'Order', // Nombre del modelo Order
    localField: 'orderIdOrder', // Campo local que referencia a Order
    foreignField: '_id', // Campo en Order
});

// Relación con product
detailOrderSchema.virtual('product', {
    ref: 'Product', // Nombre del modelo Product
    localField: 'productIdProduct', // Campo local que referencia a Product
    foreignField: '_id', // Campo en Product
});


const DetailOrder = mongoose.model('DetailOrder', detailOrderSchema);

export default DetailOrder;
