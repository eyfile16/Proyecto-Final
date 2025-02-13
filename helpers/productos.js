const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoSchema = new Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
    proveedor: { type: Schema.Types.ObjectId, ref: 'Proveedor', required: true }
});