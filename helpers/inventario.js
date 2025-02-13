const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventarioSchema = new Schema({
    producto: { type: Schema.Types.ObjectId, ref: 'Producto', required: true },
    tipoMovimiento: { type: String, enum: ['entrada', 'salida', 'devolución'], required: true },
    cantidad: { type: Number, required: true },
    fecha: { type: Date, default: Date.now }
});