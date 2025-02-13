const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriaSchema = new Schema({
    nombre: { type: String, required: true, unique: true }
});

module.exports = {
    Usuario: mongoose.model('Usuario', UsuarioSchema),
    Inventario: mongoose.model('Inventario', InventarioSchema),
    Orden: mongoose.model('Orden', OrdenSchema),
    Producto: mongoose.model('Producto', ProductoSchema),
    Proveedor: mongoose.model('Proveedor', ProveedorSchema),
    Categoria: mongoose.model('Categoria', CategoriaSchema)
};
