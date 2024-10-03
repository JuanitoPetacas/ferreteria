import Order from '../modules/order.js'; // Asegúrate de que la ruta es correcta

import User from '../modules/user.js'; // Asegúrate de que la ruta es correcta

import Product from '../modules/product.js'; // Asegúrate de que la ruta es correcta
import DetailOrder from '../modules/detail_order.js';

export const getOrders = async (req, res) => {
    const { userId } = req.body; // Asegúrate de que el userId se pasa en los parámetros

    try {
        // Obtener los pedidos del usuario
        const orders = await Order.find({ userIdUser: userId }).populate('detail_order'); // Incluye los detalles del pedido

        if (orders.length === 0) {
            return res.status(404).json({ message: 'No se encontraron pedidos para este usuario.' });
        }

        return res.status(200).json(orders); // Devuelve los pedidos encontrados
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener los pedidos', error });
    }
};

export const orderList = async (req, res) => {
    try {
        const list = await Order.find().populate('detail_order');
        res.status(200).send({ message: 'List of orders', list: list });
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving orders', error: error });
    }
};

export const obtainOrder = async (req, res) => {
    const arrayProducts = req.body.products;
    console.log(arrayProducts);
    try {
        const promise = arrayProducts.map(product => DetailOrder.create(product));

        await Promise.all(promise);

        res.status(200).send({ message: 'Order generated successfully', order: promise });
    } catch (error) {
        res.status(500).send({ status: error, message: error.message });
    }
};

export const foundDetailOrder = async (req, res) => {
    try {
        const { id_order } = req.body;
        const foundOrder = await Order.findById(id_order).populate('detail_order');
        res.status(200).send({ message: 'Detail order found', order: foundOrder });
    } catch (error) {
        res.status(500).send({ status: error, message: error.message });
    }
};

export const createOrder = async (req, res) => {
    const { userId, pay_method, status, agency, products } = req.body; // Asegúrate de que recibes userId y products

    try {
        // Calcular el total del pedido
        const total_price = products.reduce((total, productItem) => total + (productItem.price * productItem.quantity), 0);

        // Crear la cabecera del pedido
        const orderCreate = await Order.create({
            date_order: new Date(),
            total_price,
            status: 'in progress', // o el estado que desees
            userIdUser: userId
        });

        const payCreate = await Pay.create({
            amount: total_price,
            date_pay: new Date(),
            pay_method: pay_method,
            status: status,
            orderIdOrder: orderCreate._id, // ID del pedido
        });

        const sendCreate = await Send.create({
            agency: agency,
            status: "pending",
            orderIdOrder: orderCreate._id,
            payIdPay: payCreate._id, // ID del pago
        });

        // Crear los detalles del pedido y actualizar stock
        const orderDetails = [];

        for (const productItem of products) {
            // Encuentra el producto por su ID
            const productRecord = await Product.findById(productItem.id_product);

            if (!productRecord) {
                throw new Error(`Product with ID ${productItem.id_product} not found`);
            }

            // Resta la cantidad comprada del stock disponible
            const newStock = productRecord.stock - productItem.quantity;
            if (newStock < 0) {
                throw new Error(`Insufficient stock for product ${productRecord.name_product}`);
            }

            // Actualiza el stock del producto
            await Product.findByIdAndUpdate(productItem.id_product, { stock: newStock });

            // Agregar los detalles del pedido
            orderDetails.push({
                name_product: productItem.name_product,
                description: productItem.description,
                price_product: productItem.price,
                quantity_product: productItem.quantity,
                orderIdOrder: orderCreate._id, // Cambiado a _id
                productIdProduct: productItem.id_product, // ID del producto
            });
        }

        await DetailOrder.insertMany(orderDetails);

        return res.status(201).json({
            message: 'Order created successfully',
            orderCreate
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating order', error });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const { id_order } = req.body;
        const foundOrder = await Order.findById(id_order);
        
        if (foundOrder) {
            await foundOrder.remove(); // Cambiado a remove()
            res.status(200).send({ message: 'Order deleted successfully' });
        } else {
            res.status(404).send({ message: 'Order not found' });
        }
        
    } catch (error) {
        res.status(500).send({ message: 'Error deleting order', error: error.message });
    }
};
