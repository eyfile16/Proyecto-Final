const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProveedorSchema = new Schema({
    nombre: { type: String, required: true },
    contacto: { type: String, required: true },
    telefono: { type: String, required: true }
});
