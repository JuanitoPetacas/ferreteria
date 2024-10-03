import Carshop from '../modules/carshop.js';
import DetailCarshop from '../modules/detail_carshop.js';
import Product from '../modules/product.js';

export const carshopList = async (req, res) => {
    const { id_user } = req.body;
    console.log(id_user);

    try {
        // Busca el carrito del usuario
        const carrito = await Carshop.findOne({ userIdUser: id_user })
            .populate({
                path: 'detail_carshop',
                populate: {
                    path: 'product',
                    select: ['id_product', 'name_product', 'description', 'price', 'image_url', 'stock', 'status'], // Solo los atributos necesarios
                },
                select: ['id_detail_carshop', 'amount', 'quantity', 'carshopIdCarshop'], // Solo los atributos necesarios
            })
            .select(['id_carshop', 'date_creation', 'total_price', 'userIdUser']); // Solo los atributos necesarios

        // Si se encontró el carrito, devuélvelo
        if (carrito) {
            return res.status(200).json(carrito);
        }

        // Si no se encontró ningún carrito, devolver mensaje adecuado
        return res.status(404).json({ message: 'Carrito no encontrado' });

    } catch (err) {
        // Capturar y devolver errores
        console.error("Error al buscar el carrito:", err);
        return res.status(500).json({ message: 'Error al buscar el carrito', error: err.message });
    }
};

export const obtainCarshop = async (req, res) => {
    const { id_user, amount, quantity, id_product } = req.body;

    try {
        // Verifica si el carrito ya existe para el usuario
        const foundCarrito = await Carshop.findOne({ userIdUser: id_user });

        if (foundCarrito) {
            // Crea un nuevo detalle de carrito para el producto actual
            const createDetailCar = await DetailCarshop.create({
                amount: amount,
                quantity: quantity,
                carshopIdCarshop: foundCarrito.id_carshop,
                productIdProduct: id_product
            });

            // Busca todos los detalles del carrito asociado
            const foundDetailCar = await DetailCarshop.find({ carshopIdCarshop: foundCarrito.id_carshop });

            if (foundDetailCar) {
                // Calcula el precio total acumulado de todos los productos en el carrito
                const totalPrice = foundDetailCar.reduce((acc, item) => acc + (item.amount * item.quantity), 0);

                // Actualiza el precio total del carrito solo una vez
                await Carshop.updateOne({ userIdUser: id_user }, { total_price: totalPrice });

                res.status(200).send({ message: 'Producto agregado correctamente' });
            }
        } else {
            // Si no hay un carrito, crea uno nuevo
            const carrito = await Carshop.create({
                date_creation: new Date(),
                total_price: amount * quantity,
                userIdUser: id_user
            });

            // Crea un detalle para el nuevo carrito
            await DetailCarshop.create({
                amount: amount,
                quantity: quantity,
                carshopIdCarshop: carrito.id_carshop,
                productIdProduct: id_product
            });

            res.status(200).send({ message: 'Producto agregado correctamente y carrito creado' });
        }

    } catch (error) {
        console.error("Error al agregar al carrito:", error);
        res.status(500).send({ status: error, message: error.message });
    }
};

export const createCarshop = async (req, res) => {
    try {
        const { date_creation, total_price, userIdUser } = req.body;
        const carshopArray = await Carshop.create({
            date_creation: date_creation,
            total_price: total_price,
            userIdUser: userIdUser,
        });
        res.status(200).send({ message: 'Carshop created successfully', carshop: carshopArray });
    } catch (error) {
        res.status(500).send({ message: 'Error creating order', error: error });
    }
};

export const deleteObjectsCarshop = async (req, res) => {
    try {
        const { id_detail_carshop } = req.body;
        console.log(id_detail_carshop);
        const foundDetailCar = await DetailCarshop.findOne({ id_detail_carshop: id_detail_carshop });

        if (foundDetailCar) {
            await foundDetailCar.remove();
            res.status(200).send({ message: 'Product deleted successfully' });
        } else {
            res.status(404).send({ message: 'Detail not found' });
        }

    } catch (error) {
        res.status(500).send({ message: 'Error deleting Product', error: error.message });
    }
};

export const deleteCarshop = async (req, res) => {
    const { id_carshop } = req.body;
    try {
        const foundCarshop = await Carshop.findById(id_carshop);
        if (foundCarshop) {
            await foundCarshop.remove();
            res.status(200).send({ message: 'Carshop deleted successfully' });
        } else {
            res.status(404).send({ message: 'Carshop not found' });
        }

    } catch (error) {
        res.status(500).send({ message: 'Error deleting carshop', error: error.message });
    }
};

export const updatedCarshop = async (req, res) => {
    const { id_carshop, date_creation, total_price, id_user } = req.body;
    try {
        const newCar = await Carshop.findById(id_carshop);
        if (newCar) {
            newCar.date_creation = date_creation;
            newCar.total_price = total_price;
            newCar.userIdUser = id_user;

            await newCar.save();
            res.status(200).send({ message: 'Car updated successfully', car: newCar });
        } else {
            res.status(404).send({ message: 'Carshop not found' });
        }

    } catch (error) {
        res.status(500).send({ message: 'Error updating car', error: error.message });
    }
};
