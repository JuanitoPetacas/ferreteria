import User from '../modules/user.js'
import bcrypt from 'bcrypt'
import fs from 'fs'
import path from 'path'

export const listUser = async (req, res) => {
    try {
        const list = await User.find();

        if (list.length > 0) {
            res.send({ list });
        } else {
            res.status(200).send({ status: 'no data', message: 'no data in list' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error retrieving users', error: error.message });
    }
}

export const foundUser = async (req, res) => {
    try {
        const { id_user } = req.body;
        const foundUser = await User.findById(id_user);
        
        if (foundUser) {
            res.status(200).send({ message: 'User found', user: foundUser });
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error finding user' });
    }
}

export const createUser = async (req, res) => {
    try {
        const { name_user, email_user, password_user, address, phone, rol } = req.body;

        // Encripta la contraseña
        const password = encriptarPassword(password_user);

      

        // Crea un nuevo usuario en la base de datos
        const newUser = await User.create({
            name_user,
            email_user,
            password_user: password,
            address,
            phone,
            rol,
        });

        // Envía una respuesta exitosa si el usuario se creó correctamente
        res.send({ message: "User Created", user: newUser });

    } catch (error) {
        // Envía una respuesta de error en caso de fallo
        res.status(500).send({ message: "Error", error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id_user, name_user, email_user, password_user, address, phone, rol } = req.body;

        const editUser = await User.findById(id_user);
        
        if (editUser) {
            editUser.name_user = name_user;
            editUser.email_user = email_user;
            editUser.address = address;
            editUser.password_user = password_user;
            editUser.phone = phone;
            editUser.rol = rol;
            await editUser.save();
            res.send({ message: "User edited", user: editUser });
        } else {
            res.send({ message: "Error", user: 'ID not found' });
        }
    } catch (error) {
        res.status(500).send({ message: "Error", error: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id_user } = req.body;
        const deleteUser = await User.findById(id_user);
        
        if (deleteUser) {
            await deleteUser.remove();
            res.send({ message: "User deleted", user: deleteUser });
        } else {
            res.send({ message: "Error", user: 'ID not found' });
        }
    } catch (error) {
        res.send({ message: "Error", error: error.message });
    }
}

export const login = async (req, res) => {
    const { email_user, password_user } = req.body;
    const user = await User.findOne({ email_user: email_user });

    if (user && comparePass(password_user, user.password_user)) {
        res.send({ message: "Login successful", user: user });
    } else {
        res.send({ message: "Incorrect password or email, verify your data" });
    }
}

const encriptarPassword = (password) => {
    const saltrounds = 10;
    const salt = bcrypt.genSaltSync(saltrounds);
    return bcrypt.hashSync(password, salt);
};

const comparePass = (pass, hashPass) => {
    return bcrypt.compareSync(pass, hashPass);
};