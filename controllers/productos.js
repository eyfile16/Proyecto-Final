const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');
const { verificarToken, esAdmin } = require('../middlewares/auth');

// Crear producto
router.post('/', verificarToken, esAdmin, async (req, res) => {
    try {
        const producto = new Producto(req.body);
        await producto.save();
        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// Listar productos
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// Obtener detalles de un producto
router.get('/:id', async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
        res.json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// Actualizar producto
router.put('/:id', verificarToken, esAdmin, async (req, res) => {
    try {
        const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!productoActualizado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
        res.json(productoActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// Eliminar producto
router.delete('/:id', verificarToken, esAdmin, async (req, res) => {
    try {
        const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
        if (!productoEliminado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
        res.json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

module.exports = router;
