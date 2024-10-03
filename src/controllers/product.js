import Product from '../modules/product.js';
import fs from 'fs';

export const listProduct = async (req, res) => {
    try {
        const list = await Product.find(); // Utiliza Mongoose para obtener todos los productos
        if (list.length > 0) {
            res.send({ list });
        } else {
            res.status(404).send({ message: 'No products found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error fetching products', error: error.message });
    }
};

export const foundProduct = async (req, res) => {
    try {
        const { id_product } = req.body;
        const product = await Product.findById(id_product); // Encuentra el producto por ID
        if (product) {
            res.send({ product });
        } else {
            res.status(404).send({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error finding product', error: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name_product, description, price, stock, categoryIdCategory } = req.body;
        const image_url = req.file.path; // Usa el path de la imagen

        const newProduct = new Product({
            name_product,
            description,
            price,
            stock,
            image_url,
            categoryIdCategory,
        });

        await newProduct.save(); // Guarda el nuevo producto en la base de datos
        res.status(200).send({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        res.status(500).send({ message: 'Error creating product', error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id_product, name_product, description, price, stock, categoryIdCategory } = req.body;
        const image_url = req.file.path;

        const updatedProduct = await Product.findById(id_product);
        if (updatedProduct) {
            updatedProduct.name_product = name_product;
            updatedProduct.description = description;
            updatedProduct.price = price;
            updatedProduct.stock = stock;
            updatedProduct.image_url = image_url;
            updatedProduct.categoryIdCategory = categoryIdCategory;
            await updatedProduct.save(); // Guarda los cambios

            res.status(200).send({ message: 'Product updated successfully', product: updatedProduct });
        } else {
            res.status(404).send({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error updating product', error: error.message });
    }
};

export const disableProduct = async (req, res) => {
    try {
        const { id_product } = req.body;
        const product = await Product.findById(id_product);
        if (product) {
            product.status = 'inactive';
            await product.save();
            res.status(200).send({ message: 'Product Inactive', product });
        } else {
            res.status(404).send({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error disabling product:', error);
        res.status(500).send({ message: 'Error disabling product', error: error.message });
    }
};

export const enableProduct = async (req, res) => {
    try {
        const { id_product } = req.body;
        const product = await Product.findById(id_product);
        if (product) {
            product.status = 'active';
            await product.save();
            res.status(200).send({ message: 'Product active', product });
        } else {
            res.status(404).send({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error activating product:', error);
        res.status(500).send({ message: 'Error activating product', error: error.message });
    }
};

export const file = async (req, res) => {
    const photo = req.body.photo;
    const path_api = './uploads/' + photo;
    fs.access(path_api, (error) => {
        if (!error) {
            return res.sendFile(path.resolve(path_api));
        } else {
            res.status(404).send({
                status: 'error',
                mensaje: 'no existe la imagen',
                error,
                photo,
                path_api,
            });
        }
    });
};
