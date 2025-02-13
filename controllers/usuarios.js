const User = require('../models/usuarios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { verifyToken, isAdmin } = require('../middlewares/auth');

// Registrar usuario
exports.register = async (req, res) => {
    try {
        const { nombre, email, contraseña } = req.body;
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const nuevoUsuario = new User({ nombre, email, contraseña: hashedPassword });
        await nuevoUsuario.save();
        res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// Iniciar sesión
exports.login = async (req, res) => {
    try {
        const { email, contraseña } = req.body;
        const usuario = await User.findOne({ email });
        if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

        const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!esValida) return res.status(401).json({ mensaje: 'Credenciales incorrectas' });

        const token = jwt.sign({ id: usuario._id, esAdmin: usuario.esAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, usuario });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// Obtener lista de usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await User.find().select('-contraseña');
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// Obtener usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await User.findById(req.params.id).select('-contraseña');
        if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// Actualizar usuario
exports.actualizarUsuario = async (req, res) => {
    try {
        const { nombre, email } = req.body;
        const usuarioActualizado = await User.findByIdAndUpdate(req.params.id, { nombre, email }, { new: true }).select('-contraseña');
        if (!usuarioActualizado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        res.json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
    try {
        const usuarioEliminado = await User.findByIdAndDelete(req.params.id);
        if (!usuarioEliminado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        res.json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};
