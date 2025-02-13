const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrdenSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    productos: [{
        producto: { type: Schema.Types.ObjectId, ref: 'Producto', required: true },
        cantidad: { type: Number, required: true }
    }],
    total: { type: Number, required: true },
    estado: { type: String, enum: ['pendiente', 'enviado', 'entregado', 'cancelado'], default: 'pendiente' },
    fecha: { type: Date, default: Date.now }
});
