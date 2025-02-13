const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Modelo de Usuario
const UsuarioSchema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
    rol: { type: String, enum: ['usuario', 'admin'], default: 'usuario' }
});